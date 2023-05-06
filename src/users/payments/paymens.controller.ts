import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Session,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../user.service';
import { AuthService } from '../auth/auth.service';
import { PaymentsService } from './payments.service';
import {
  AddCreditCardDto,
  RemoveBankAccountDto,
  RemoveCreditCardDto,
  SetDefaultCreditCardDto, TransferDto,
} from './payments.validation';
import { AuthenticatedGuard } from '../auth/utils/local.auth.guard';

@Controller('payments')
export class PaymensController {

  constructor(
    private readonly usersService: UserService,
    private readonly authService: AuthService,
    private readonly paymentsService: PaymentsService
  ) {}


  //credit card
  //----------

  @UseGuards(AuthenticatedGuard)
  @Post('add-payment-method')
  async addPaymentMethod(
    @Body() paymentMethod: AddCreditCardDto,
    @Session() session: Record<string, any>
  ) {
    const user = await this.usersService.getUserById(session.passport.user);
    await this.paymentsService.attachPaymentMehod(paymentMethod.paymentMethodId, user.stripeCustomerId);
    return {message: "Payment method attached successfuly"};
  }

  @UseGuards(AuthenticatedGuard)
  @Post('list-payment-methods')
  async listPaymentMethods(
    @Session() session: Record<string, any>
  ) {
    const user = await this.usersService.getUserById(session.passport.user);
    const paymentMethods = await this.paymentsService.listPaymentMethods(user.stripeCustomerId);
    if (!paymentMethods)
      throw new HttpException("Could not get payment method", HttpStatus.INTERNAL_SERVER_ERROR);
    return {paymentMethods};
  }


  @Post('remove-payment-method')
  async removePaymentMethod(
    @Session() session: Record<string, any>,
    @Body() paymentMethod: RemoveCreditCardDto,
  ) {
    try {
      await this.paymentsService.removePaymentMethod(paymentMethod.paymentMethodId);
      return { message: 'Payment method removed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('default')
  @UseGuards(AuthenticatedGuard)
  async setDefaultCard(
    @Body() creditCard: SetDefaultCreditCardDto,
    @Session() session: Record<string, any>
  ) {
    const user = await this.usersService.getUserById(session.passport.user);
    await this.paymentsService.setDefaultCreditCard(creditCard.paymentMethodId, user.stripeCustomerId);
  }


  //bank account
  //-------------


  @Post('remove-bank-account')
  async removeBankAccount(
    @Body() data: RemoveBankAccountDto,
    @Session() session: Record<string, any>
  ) {
    const user = await this.usersService.getUserById(session.passport.user);
    try {
      await this.paymentsService.removeBankAccount(user.stripeCustomerId, data.bankAccountId);
      return { message: 'Bank account removed successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('get-bank-account')
  async getBankAccount(
    @Body() data: RemoveBankAccountDto,
    @Session() session: Record<string, any>
  ) {
    const user = await this.usersService.getUserById(session.passport.user);
    try {
      const bankAccount = await this.paymentsService.getBankAccount(user.stripeCustomerId, data.bankAccountId);
      return bankAccount;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }





  //transfer
  //-------

  @Post('create-transfer')
  @UsePipes(ValidationPipe)
  async createTransfer(
    @Body() transferData: TransferDto
  ){
    try {
      const transfer = await this.paymentsService.createTransfer(
        transferData.source,
        transferData.destination,
        transferData.amount,
        transferData.currency
      )
      return transfer;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}