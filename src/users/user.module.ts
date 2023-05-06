import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "./user.model";
import { UserController } from './user.controller';
import { UserStatsSchema } from './user_stats/user.stats.model';
import { BookSchema } from '../books/book/book.model';
import { PaymentsService } from './payments/payments.service';
import { AuthService } from './auth/auth.service';
import { UserStatsService } from './user_stats/user.stats.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: "user", schema: UserSchema},
    { name: "user_stats", schema: UserStatsSchema},
    { name: "book", schema: BookSchema}])],
  providers: [UserService, AuthService, UserStatsService],
  controllers: [UserController]
})
export class UserModule {}
