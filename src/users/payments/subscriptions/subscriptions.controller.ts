
import { Controller, Post, Req, UseGuards, Get, Session } from '@nestjs/common';
import SubscriptionsService from './subscriptions.service';
import { AuthenticatedGuard } from '../../auth/utils/local.auth.guard';

@Controller('subscriptions')
export default class SubscriptionsController {
  constructor(
    private readonly subscriptionsService: SubscriptionsService
  ) {}

  @Post('reader')
  @UseGuards(AuthenticatedGuard)
  async createReaderSubscription(
    @Session() session: Record<string, any>
  ) {
    return this.subscriptionsService.createMonthlySubscription('stripeCustomerId');
  }

  @Get('reader')
  @UseGuards(AuthenticatedGuard)
  async getReaderSubscription(
    @Session() session: Record<string, any>
  ) {
    return this.subscriptionsService.getMonthlySubscription('stripe custumer id');
  }

  @Post('writer')
  @UseGuards(AuthenticatedGuard)
  async createWriterSubscription(
    @Session() session: Record<string, any>
  ) {
    return this.subscriptionsService.createMonthlySubscription('stripeCustomerId');
  }

  @Get('writer')
  @UseGuards(AuthenticatedGuard)
  async getWriterSubscription(
    @Session() session: Record<string, any>
  ) {
    return this.subscriptionsService.getMonthlySubscription('stripe custumer id');
  }
}