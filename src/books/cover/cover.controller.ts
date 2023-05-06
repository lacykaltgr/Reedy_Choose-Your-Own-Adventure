import {
  Body,
  CacheInterceptor,
  Controller,
  Delete,
  Get, HttpException, HttpStatus,
  Param,
  Post, Session, UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../../util/objectid.validation';
import { ObjectId } from 'mongoose';
import { CoverDto } from './cover.validation';
import { CoverService } from './cover.service';
import { AuthenticatedGuard } from '../../users/auth/utils/local.auth.guard';
import { BookStatsService } from '../book_stats/book_stats.service';
import { UserStatsService } from '../../users/user_stats/user.stats.service';

@UseInterceptors(CacheInterceptor)
@Controller('cover')
export class CoverController {

  constructor(
    private readonly coverService: CoverService,
    private readonly bookStatsService: BookStatsService,
    private readonly userStatService: UserStatsService) {}



  @UseGuards(AuthenticatedGuard)
  @Get(':coverid')
  async getCover(
    @Param('coverid', ParseObjectIdPipe) coverId: ObjectId
  ) {
    const cover = await this.coverService.getCoverById(coverId);
    if (!cover)
      throw new HttpException('Cover not found', HttpStatus.NOT_FOUND);
    return cover;
  }

  @UseGuards(AuthenticatedGuard)
  @Get('filter')
  async filterCover(
    @Body() search: string
  ) {
    const result = await this.coverService.searchCover(search);
    if (!result)
      throw new HttpException('Internal error (could not carry out search)', HttpStatus.NOT_FOUND);
    return result;
  }


  @UseGuards(AuthenticatedGuard)
  @Post('update/:coverid')
  @UsePipes(new ValidationPipe())
  async updateCover(
    @Param('coverid', ParseObjectIdPipe) coverid: ObjectId,
    @Body() cover: CoverDto,
    @Session() session: Record<string, any>
  ) {
    const user_stats = await this.userStatService.getUserStatsById(session.user.stats_id);
    if (!user_stats.covers.includes(coverid))
      throw new HttpException('Unauthorized to update cover', HttpStatus.UNAUTHORIZED);
    try {
      await this.coverService.updateCover(coverid, cover);
      console.log('Cover updated successfully');
    } catch (error) {
      console.error(error);
    }
  }


  @UseGuards(AuthenticatedGuard)
  @Delete('unpublish/:coverid')
  async unpublishBook(
    @Param('coverid', ParseObjectIdPipe) coverid: ObjectId,
    @Session() session: Record<string, any>
  ) {
    const user_stats = await this.userStatService.getUserStatsById(session.user.stats_id);
    if (!user_stats.covers.includes(coverid))
      throw new HttpException('Unauthorized to update cover', HttpStatus.UNAUTHORIZED);
    try {
      await this.coverService.deleteCoverById(coverid);
      console.log('Cover deleted successfully');
    } catch (error) {
      console.error(error);
    }
  }


  @UseGuards(AuthenticatedGuard)
  @Get('mybooks')
  async getMyBookCovers(
    @Session() session: Record<string, any>
  ) {
    const covers = await this.coverService.getCoversByUserId(session.user.id);
    if (!covers)
      throw new HttpException('Cover not found', HttpStatus.NOT_FOUND);
    return covers;
  }

  @Get('stats/:statsid')
  @UsePipes(ValidationPipe)
  async getBookStats(
    @Session() session: Record<string, any>,
    @Param('statsid', ParseObjectIdPipe) stats_id: ObjectId
  ) {
    const stats = await this.bookStatsService.getStats(stats_id);
    if (!stats)
      throw new HttpException('Stats not found', HttpStatus.NOT_FOUND);
    if (stats.owner_id != session.user.id)
      throw new HttpException('Unauthorized to get stats', HttpStatus.UNAUTHORIZED);
    return stats;

  }


}
