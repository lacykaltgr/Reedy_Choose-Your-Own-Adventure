"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymensController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user.service");
const auth_service_1 = require("../auth/auth.service");
const payments_service_1 = require("./payments.service");
const payments_validation_1 = require("./payments.validation");
const local_auth_guard_1 = require("../auth/utils/local.auth.guard");
let PaymensController = class PaymensController {
    constructor(usersService, authService, paymentsService) {
        this.usersService = usersService;
        this.authService = authService;
        this.paymentsService = paymentsService;
    }
    async addPaymentMethod(paymentMethod, session) {
        const user = await this.usersService.getUserById(session.passport.user);
        await this.paymentsService.attachPaymentMehod(paymentMethod.paymentMethodId, user.stripeCustomerId);
        return { message: "Payment method attached successfuly" };
    }
    async listPaymentMethods(session) {
        const user = await this.usersService.getUserById(session.passport.user);
        const paymentMethods = await this.paymentsService.listPaymentMethods(user.stripeCustomerId);
        if (!paymentMethods)
            throw new common_1.HttpException("Could not get payment method", common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        return { paymentMethods };
    }
    async removePaymentMethod(session, paymentMethod) {
        try {
            await this.paymentsService.removePaymentMethod(paymentMethod.paymentMethodId);
            return { message: 'Payment method removed successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async setDefaultCard(creditCard, session) {
        const user = await this.usersService.getUserById(session.passport.user);
        await this.paymentsService.setDefaultCreditCard(creditCard.paymentMethodId, user.stripeCustomerId);
    }
    async removeBankAccount(data, session) {
        const user = await this.usersService.getUserById(session.passport.user);
        try {
            await this.paymentsService.removeBankAccount(user.stripeCustomerId, data.bankAccountId);
            return { message: 'Bank account removed successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getBankAccount(data, session) {
        const user = await this.usersService.getUserById(session.passport.user);
        try {
            const bankAccount = await this.paymentsService.getBankAccount(user.stripeCustomerId, data.bankAccountId);
            return bankAccount;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async createTransfer(transferData) {
        try {
            const transfer = await this.paymentsService.createTransfer(transferData.source, transferData.destination, transferData.amount, transferData.currency);
            return transfer;
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Post)('add-payment-method'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payments_validation_1.AddCreditCardDto, Object]),
    __metadata("design:returntype", Promise)
], PaymensController.prototype, "addPaymentMethod", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Post)('list-payment-methods'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymensController.prototype, "listPaymentMethods", null);
__decorate([
    (0, common_1.Post)('remove-payment-method'),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, payments_validation_1.RemoveCreditCardDto]),
    __metadata("design:returntype", Promise)
], PaymensController.prototype, "removePaymentMethod", null);
__decorate([
    (0, common_1.Post)('default'),
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payments_validation_1.SetDefaultCreditCardDto, Object]),
    __metadata("design:returntype", Promise)
], PaymensController.prototype, "setDefaultCard", null);
__decorate([
    (0, common_1.Post)('remove-bank-account'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payments_validation_1.RemoveBankAccountDto, Object]),
    __metadata("design:returntype", Promise)
], PaymensController.prototype, "removeBankAccount", null);
__decorate([
    (0, common_1.Post)('get-bank-account'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payments_validation_1.RemoveBankAccountDto, Object]),
    __metadata("design:returntype", Promise)
], PaymensController.prototype, "getBankAccount", null);
__decorate([
    (0, common_1.Post)('create-transfer'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [payments_validation_1.TransferDto]),
    __metadata("design:returntype", Promise)
], PaymensController.prototype, "createTransfer", null);
PaymensController = __decorate([
    (0, common_1.Controller)('payments'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        payments_service_1.PaymentsService])
], PaymensController);
exports.PaymensController = PaymensController;
//# sourceMappingURL=paymens.controller.js.map