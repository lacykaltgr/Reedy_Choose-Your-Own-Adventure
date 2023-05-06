import {
  Body,
  Controller,
  Get,
  HttpException, HttpStatus,
  Post,
  Session,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import {UserService} from "./user.service";
import { AuthenticatedGuard } from './auth/utils/local.auth.guard';
import { ChangePasswordDto } from './user.validation';
import { AuthService } from './auth/auth.service';
import { User } from './user.model';
import { PaymentsService } from './payments/payments.service';
import Stripe from 'stripe';
import { UserStats } from './user_stats/user.stats.model';
import { UserStatsService } from './user_stats/user.stats.service';

@Controller('user')
export class UserController {

    constructor(
      private readonly usersService: UserService,
      private readonly authService: AuthService,
      private readonly userStatsService: UserStatsService,
    ) {}


    @UseGuards(AuthenticatedGuard)
    @Get('me')
    async getMe(
      @Session() session: Record<string, any>
    ) : Promise<User> {
      const me = this.usersService.getUserById(session.user.id);
      if (!me)
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      return me;
    }

    @Get('stats')
    async getUserStats(
      @Session() session: Record<string, any>
    ) : Promise<UserStats> {
      const user = await this.usersService.getUserById(session.passport.user);
      const stats = await this.userStatsService.getUserStatsById(user.stats_id);
      return stats;
    }


    @Post('change-password')
    async changePassword(
      @Body() changePasswordDto: ChangePasswordDto,
      @Session() session: Record<string, any>
    ): Promise<void> {
      if (!changePasswordDto || !changePasswordDto.currentPassword || !changePasswordDto.newPassword) {
        throw new HttpException('Missing required fields', HttpStatus.BAD_REQUEST);
      }
      const user = await this.getMe(session);
      const isPasswordCorrect = await this.authService.validateUser(
        user.username,
        changePasswordDto.currentPassword,
      );
      if (!isPasswordCorrect) {
        throw new HttpException('Incorrect current password', HttpStatus.BAD_REQUEST);
      }
      try {
        await this.usersService.changePassword(user.id, changePasswordDto.newPassword);
      } catch (error) {
        throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

}
