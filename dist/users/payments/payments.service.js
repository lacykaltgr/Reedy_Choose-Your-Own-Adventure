"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
let PaymentsService = class PaymentsService {
    async createCustomer(name, email) {
        const customer = await this.stripe.customers.create({
            name,
            email,
        });
        return customer.id;
    }
    async charge(amount, paymentMethodId, customerId) {
        return this.stripe.paymentIntents.create({
            amount,
            customer: customerId,
            payment_method: paymentMethodId,
            currency: 'huf',
            confirm: true
        });
    }
    async createTransfer(source, destination, amount, currency) {
        const transfer = await this.stripe.transfers.create({
            source_transaction: source,
            destination,
            amount,
            currency,
        });
        return transfer;
    }
    async attachPaymentMehod(paymentMethodId, customerId) {
        return this.stripe.setupIntents.create({
            customer: customerId,
            payment_method: paymentMethodId,
        });
    }
    async removePaymentMethod(paymentMethodId) {
        try {
            await this.stripe.paymentMethods.detach(paymentMethodId);
        }
        catch (error) {
            throw new Error(`Error removing payment method: ${error.message}`);
        }
    }
    async getDefaultPaymentMethod(paymentMethodId) {
        try {
            const pm = await this.stripe.paymentMethods.retrieve(paymentMethodId);
            return pm;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async updatePaymentMethod(paymentMethodId, data) {
        try {
            const updated = await this.stripe.paymentMethods.update(paymentMethodId, data);
            console.log("Payment method updated successfully");
            return updated;
        }
        catch (error) {
            throw new Error(`Error removing payment method: ${error.message}`);
        }
    }
    async listPaymentMethods(customerId) {
        const paymentMethods = await this.stripe.paymentMethods.list({
            customer: customerId,
            type: 'card',
        });
        return paymentMethods;
    }
    async setDefaultCreditCard(paymentMethodId, customerId) {
        try {
            return await this.stripe.customers.update(customerId, {
                invoice_settings: {
                    default_payment_method: paymentMethodId
                }
            });
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.type) === 'StripeInvalidRequestError') {
                throw new common_1.BadRequestException('Wrong credit card chosen');
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async listBankAccounts(customerId) {
        const bankAccounts = await this.stripe.customers.listSources(customerId, {
            object: 'bank_account',
        });
        return bankAccounts;
    }
    async removeBankAccount(customerId, bankAccountId) {
        await this.stripe.customers.deleteSource(customerId, bankAccountId);
    }
    async updateBankAccount(customerId, bankAccountId, data) {
        const bankAccount = await this.stripe.customers.updateSource(customerId, bankAccountId, data);
        return bankAccount;
    }
    async getBankAccount(customerId, bankAccountId) {
        const bankAccount = await this.stripe.customers.retrieveSource(customerId, bankAccountId);
        return bankAccount;
    }
    async createSubscription(priceId, customerId) {
        try {
            return await this.stripe.subscriptions.create({
                customer: customerId,
                items: [
                    {
                        price: priceId
                    }
                ]
            });
        }
        catch (error) {
            if ((error === null || error === void 0 ? void 0 : error.code) === "StripeError.ResourceMissing") {
                throw new common_1.BadRequestException('Credit card not set up');
            }
            throw new common_1.InternalServerErrorException();
        }
    }
    async listSubscriptions(priceId, customerId) {
        return this.stripe.subscriptions.list({
            customer: customerId,
            price: priceId
        });
    }
};
PaymentsService = __decorate([
    (0, common_1.Injectable)()
], PaymentsService);
exports.PaymentsService = PaymentsService;
//# sourceMappingURL=payments.service.js.map