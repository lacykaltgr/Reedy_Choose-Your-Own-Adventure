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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const payments_service_1 = require("../payments.service");
let SubscriptionsService = class SubscriptionsService {
    constructor(paymentsService) {
        this.paymentsService = paymentsService;
    }
    async createMonthlySubscription(customerId) {
        const priceId = 'MONTHLY_SUBSCRIPTION_PRICE_ID';
        const subscriptions = await this.paymentsService.listSubscriptions(priceId, customerId);
        if (subscriptions.data.length) {
            throw new common_1.BadRequestException('Customer already subscribed');
        }
        return this.paymentsService.createSubscription(priceId, customerId);
    }
    async getMonthlySubscription(customerId) {
        const priceId = 'MONTHLY_SUBSCRIPTION_PRICE_ID';
        const subscriptions = await this.paymentsService.listSubscriptions(priceId, customerId);
        if (!subscriptions.data.length) {
            return new common_1.NotFoundException('Customer not subscribed');
        }
        return subscriptions.data[0];
    }
};
SubscriptionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [payments_service_1.PaymentsService])
], SubscriptionsService);
exports.default = SubscriptionsService;
//# sourceMappingURL=subscriptions.service.js.map