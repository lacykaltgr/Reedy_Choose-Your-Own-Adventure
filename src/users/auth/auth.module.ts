import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {UserModule} from "../user.module";
import { PassportModule } from '@nestjs/passport';
import {LocalStrategy} from "./utils/local.strategy";
import {UserService} from "../user.service";
import {MongooseModule} from "@nestjs/mongoose";
import {UserSchema} from "../user.model";
import {AuthController} from "./auth.controller";
import { SessionSerializer } from './utils/session_serializer';
import { PaymentsService } from '../payments/payments.service';
import { UserStatsService } from '../user_stats/user.stats.service';
import { UserStatsSchema } from '../user_stats/user.stats.model';

//nem is kell elvileg

@Module({
  imports: [
      UserModule,
      PassportModule.register(
        {
        session: true
        }),
      MongooseModule.forFeature([
        { name: "user", schema: UserSchema },
        { name: "user_stats", schema: UserStatsSchema},]) ],
  providers: [
      AuthService,
      LocalStrategy,
      SessionSerializer,
      UserService,
      UserStatsService
       ],
    controllers: [AuthController]
})
export class AuthModule {}
