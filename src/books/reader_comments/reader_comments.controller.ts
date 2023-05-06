import { Controller, Delete, Get, Param, Post, Query, UseGuards, Body, UsePipes, ValidationPipe } from '@nestjs/common';
import { ReaderCommentsService } from './reade_comments.service';
import { ObjectId } from 'mongoose';
import { ReaderComments } from './reader_comments.model';
import { AuthenticatedGuard } from '../../users/auth/utils/local.auth.guard';
import { CommentDto } from './reader_comments.validation';
import { ParseObjectIdPipe } from '../../util/objectid.validation';

@Controller('reader-comments')
export class ReaderCommentsController {
  constructor(
    private readonly readerCommentsService: ReaderCommentsService
  ) {}

  @UseGuards(AuthenticatedGuard)
  @Get(':id')
  async getReaderComments(
    @Param('id') id: ObjectId
  ): Promise<ReaderComments> {
    return this.readerCommentsService.getReaderComments(id);
  }

  @UseGuards(AuthenticatedGuard)
  @Post(':id')
  @UsePipes(ValidationPipe)
  async addComment(
    @Param('id', ParseObjectIdPipe) id: ObjectId,
    @Body() comment: CommentDto,
  ): Promise<void> {
    return this.readerCommentsService.addComment(id, comment.user_id, comment.text, comment.username);
  }

  @UseGuards(AuthenticatedGuard)
  @Delete(':id')
  async removeComment(
    @Param('id') id: ObjectId,
    @Body() comment: CommentDto,
  ): Promise<void> {
    return this.readerCommentsService.removeComment(id, comment.user_id, comment.text);
  }

}