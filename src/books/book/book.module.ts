import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BookController } from './book.controller';
import { BookSchema } from './book.model';
import { BookService } from './book.service';
import { CoverService } from '../cover/cover.service';
import { CoverSchema } from '../cover/cover.model';
import { UserService } from '../../users/user.service';
import { AuthorCommentsService } from '../author_comments/author_comments.service';
import { UserSchema } from '../../users/user.model';
import { BookStatsService } from '../book_stats/book_stats.service';
import { AuthorCommentSchema } from '../author_comments/author_comments.model';
import { UserStatsService } from '../../users/user_stats/user.stats.service';
import { UserStatsSchema } from '../../users/user_stats/user.stats.model';
import { BookStatsSchema } from '../book_stats/book_stats.model';
import { ReaderCommentsService } from '../reader_comments/reade_comments.service';
import { PaymentsService } from '../../users/payments/payments.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: 'book', schema: BookSchema},
      {name: 'cover', schema: CoverSchema},
      { name: "user", schema: UserSchema},
      {name: 'author_comments', schema: AuthorCommentSchema},
      {name: 'user_stats', schema: UserStatsSchema},
      {name: 'book_stats', schema: BookStatsSchema}])
  ],
  controllers: [ BookController ],
  providers: [ BookService, CoverService, UserService, AuthorCommentsService, BookStatsService, UserStatsService, ReaderCommentsService ]
})
export class BookModule {}