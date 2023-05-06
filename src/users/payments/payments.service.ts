import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import Stripe from 'stripe';
import { ObjectId } from 'mongoose';


@Injectable()
export class  PaymentsService {
  private stripe: Stripe// = new Stripe('x', {apiVersion: '2022-11-15'});

  async createCustomer(name: string, email: string) {
    const customer = await this.stripe.customers.create({
      name,
      email,
    });
    return customer.id;
  }

  public async charge(amount: number, paymentMethodId: string, customerId: string) {
    return this.stripe.paymentIntents.create({
      amount,
      customer: customerId,
      payment_method: paymentMethodId,
      currency: 'huf',
      confirm: true
    })
  }

  async createTransfer(source: string, destination: string, amount: number, currency: string) {
    const transfer = await this.stripe.transfers.create({
      source_transaction: source,
      destination,
      amount,
      currency,
    });
    return transfer;
  }




  //credit card
  //------------

  public async attachPaymentMehod(paymentMethodId: string, customerId: string) {
    return this.stripe.setupIntents.create({
      customer: customerId,
      payment_method: paymentMethodId,
    })
  }

  async removePaymentMethod(paymentMethodId: string) {
    try {
      await this.stripe.paymentMethods.detach(paymentMethodId);
    } catch (error) {
      throw new Error(`Error removing payment method: ${error.message}`);
    }
  }

  async getDefaultPaymentMethod(paymentMethodId: string) {
    try {
      const pm = await this.stripe.paymentMethods.retrieve(paymentMethodId);
      return pm;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async updatePaymentMethod(paymentMethodId: string, data: object) {
    try {
      const updated = await this.stripe.paymentMethods.update(paymentMethodId, data);
      console.log("Payment method updated successfully");
      return updated;
    } catch (error) {
      throw new Error(`Error removing payment method: ${error.message}`);
    }
  }

  async listPaymentMethods(customerId: string) {
    const paymentMethods = await this.stripe.paymentMethods.list({
      customer: customerId,
      type: 'card',
    });
    return paymentMethods;
  }

  async setDefaultCreditCard(paymentMethodId: string, customerId: string) {
    try {
      return await this.stripe.customers.update(customerId, {
        invoice_settings: {
          default_payment_method: paymentMethodId
        }
      })
    } catch (error) {
      if (error?.type === 'StripeInvalidRequestError') {
        throw new BadRequestException('Wrong credit card chosen');
      }
      throw new InternalServerErrorException();
    }
  }




  //bank account
  //------------

  async listBankAccounts(customerId: string) {
    const bankAccounts = await this.stripe.customers.listSources(customerId, {
      object: 'bank_account',
    });
    return bankAccounts;
  }

  async removeBankAccount(customerId: string, bankAccountId: string) {
    await this.stripe.customers.deleteSource(customerId, bankAccountId);
  }

  async updateBankAccount(customerId: string, bankAccountId: string, data: object) {
    const bankAccount = await this.stripe.customers.updateSource(customerId, bankAccountId, data);
    return bankAccount;
  }

  async getBankAccount(customerId: string, bankAccountId: string) {
    const bankAccount = await this.stripe.customers.retrieveSource(customerId, bankAccountId);
    return bankAccount;

  }




  //subscriptions
  //--------------

  public async createSubscription(priceId: string, customerId: string,) {
    try {
      return await this.stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: priceId
          }
        ]
      })
    } catch (error) {
      if (error?.code === "StripeError.ResourceMissing") {
        throw new BadRequestException('Credit card not set up');
      }
      throw new InternalServerErrorException();
    }
  }

  public async listSubscriptions(priceId: string, customerId: string,) {
    return this.stripe.subscriptions.list({
      customer: customerId,
      price: priceId
    })
  }





}