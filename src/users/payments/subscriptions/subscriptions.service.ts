
import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PaymentsService } from '../payments.service';

@Injectable()
export default class SubscriptionsService {
  constructor(
    private readonly paymentsService: PaymentsService,
  ) {}

  public async createMonthlySubscription(customerId: string) {
    const priceId = 'MONTHLY_SUBSCRIPTION_PRICE_ID';

    const subscriptions = await this.paymentsService.listSubscriptions(priceId, customerId);
    if (subscriptions.data.length) {
      throw new BadRequestException('Customer already subscribed');
    }
    return this.paymentsService.createSubscription(priceId, customerId);
  }

  public async getMonthlySubscription(customerId: string) {
    const priceId = 'MONTHLY_SUBSCRIPTION_PRICE_ID';
    const subscriptions = await this.paymentsService.listSubscriptions(priceId, customerId);

    if (!subscriptions.data.length) {
      return new NotFoundException('Customer not subscribed');
    }
    return subscriptions.data[0];
  }


}