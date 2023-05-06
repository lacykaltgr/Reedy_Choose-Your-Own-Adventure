import {
  Body,
  Controller, Delete,
  Get, HttpException, HttpStatus,
  Param,
  Post,
  Session,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ParseObjectIdPipe } from '../../util/objectid.validation';
import { ObjectId } from 'mongoose';
import { CoverDto } from '../cover/cover.validation';
import { CoverService } from '../cover/cover.service';
import { AuthenticatedGuard } from '../../users/auth/utils/local.auth.guard';
import { BookDto } from './book.validation';
import { UserService } from '../../users/user.service';
import { BookStatsService } from '../book_stats/book_stats.service';
import { AuthorCommentsService } from '../author_comments/author_comments.service';
import { UserStatsService } from '../../users/user_stats/user.stats.service';
import { UpdateStatsDto } from '../book_stats/book_stats.validation';
import { AuthorCommentsDto } from '../author_comments/author_comments.validation';
import { ReaderCommentsService } from '../reader_comments/reade_comments.service';
import { Page } from './page/page.model';


@Controller('book')
export class BookController {

  constructor(
    private readonly bookService: BookService,
    private readonly coverService: CoverService,
    private readonly userService: UserService,
    private readonly userStatsService: UserStatsService,
    private readonly bookstatsService: BookStatsService,
    private readonly authorCommentsService: AuthorCommentsService,
    private readonly readerCommentsService: ReaderCommentsService,
  ) {}

  @UseGuards(AuthenticatedGuard)
  @UsePipes(ValidationPipe)
  @Get(':bookid')
  async getBook(
    @Param('bookid', ParseObjectIdPipe) bookid: ObjectId,
  ) {
    const book = await this.bookService.getBookById(bookid);
    if (!book) {
      throw new HttpException('Book not found', HttpStatus.NOT_FOUND);
    }
    return this.bookService.formatBookForRead(book);
  }

  @UseGuards(AuthenticatedGuard)
  @UsePipes(ValidationPipe)
  @Post('stat-update')
  async updateStats(
    @Body() stats: UpdateStatsDto,
    @Session() session: Record<string, any>
  ) {
    if (session.user.id != stats.user_id)
      throw new HttpException('Unauthorized stat update', HttpStatus.UNAUTHORIZED);
    try {
      await this.userService.updateStats(stats);
      await this.bookstatsService.updateStats(stats);
      return {message: 'Stats updated successfully'};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  @UseGuards(AuthenticatedGuard)
  @Get('mybooks')
  async getMyBooks(
    @Session() session: Record<string, any>
  ) {
    const covers = await this.coverService.getCoversByUserId(session.user.username);
    if (!covers){
        throw new HttpException('Covers not found', HttpStatus.NOT_FOUND);
    }
    return covers;
  }


  @UseGuards(AuthenticatedGuard)
  @Post('new')
  @UsePipes(ValidationPipe)
  async newBook(
    @Session() session: Record<string, any>,
    @Body('title') title: string
  ) {
    try {
      const book = await this.bookService.newBook(title, session.user.id);
      const author_comments = await this.authorCommentsService.newBook(book.id);
      return {
        message: 'Book created successfully',
        book,
        author_comments};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @UseGuards(AuthenticatedGuard)
  @Post('save')
  @UsePipes(ValidationPipe)
  async saveBook(
    @Session() session: Record<string, any>,
    @Body('book') book: BookDto,
    @Body('author_comments') author_comments: AuthorCommentsDto
  ) {
    const user_stats = await this.userStatsService.getUserStatsById(session.user.stats_id);
    if (!user_stats.books.includes(book.id))
      throw new HttpException('Unauthorzed to save book', HttpStatus.UNAUTHORIZED);
    try {
      await this.authorCommentsService.updateComments(book.id, author_comments);
      await this.bookService.saveBook(book.id, book);
      return {message: 'Book saved successfully'};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }




  @Delete(':bookid')
  async removeBook(
    @Param('bookid', ParseObjectIdPipe) bookid: ObjectId,
    @Session() session: Record<string, any>,
  ) {
    const user_stats = await this.userStatsService.getUserStatsById(session.user.stats_id);
    if (!user_stats.books.includes(bookid))
      throw new HttpException('Unauthorzed to remove book', HttpStatus.UNAUTHORIZED);
    try {
      await this.authorCommentsService.removeBook(bookid);
      await this.bookService.removeBook(bookid);
      return {message: 'Book deleted successfully'};
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  @Post('publish/:bookid')
  @UsePipes(new ValidationPipe())
  async publishBook(
    @Param('bookid', ParseObjectIdPipe) bookid: ObjectId,
    @Body() cover: CoverDto,
    @Session() session: Record<string, any>,
  ) {
      const user_stats = await this.userStatsService.getUserStatsById(session.user.stats_id);
      if (!user_stats.books.includes(bookid))
        throw new HttpException('Unauthorzed to save book', HttpStatus.UNAUTHORIZED);
      try {
        await this.readerCommentsService.newCover();
        await this.coverService.insertCover(cover, session.user.id, session.user.username, bookid);
        return {message: 'Book published successfully'};
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
  }

  @UsePipes(ValidationPipe)
  @Get('edit/:bookid')
  async editBook(
    @Param('bookid', ParseObjectIdPipe) bookid: ObjectId,
    @Session() session: Record<string, any>,
  ) {
      const user_stats = await this.userStatsService.getUserStatsById(session.user.stats_id);
      if (!user_stats.books.includes(bookid))
        throw new HttpException('Unauthorzed to edit book', HttpStatus.UNAUTHORIZED);
      const book = await this.bookService.getBookById(bookid);
      const author_comments = await this.authorCommentsService.getAuthorComments(book.id);
      if (!book || !author_comments)
        throw new HttpException('Covers not found', HttpStatus.NOT_FOUND);
      return {
        book: book,
        comments: author_comments
      }
  }
}
