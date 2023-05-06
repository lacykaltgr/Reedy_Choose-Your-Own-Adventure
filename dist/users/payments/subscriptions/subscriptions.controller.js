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
const common_1 = require("@nestjs/common");
const subscriptions_service_1 = require("./subscriptions.service");
const local_auth_guard_1 = require("../../auth/utils/local.auth.guard");
let SubscriptionsController = class SubscriptionsController {
    constructor(subscriptionsService) {
        this.subscriptionsService = subscriptionsService;
    }
    async createReaderSubscription(session) {
        return this.subscriptionsService.createMonthlySubscription('stripeCustomerId');
    }
    async getReaderSubscription(session) {
        return this.subscriptionsService.getMonthlySubscription('stripe custumer id');
    }
    async createWriterSubscription(session) {
        return this.subscriptionsService.createMonthlySubscription('stripeCustomerId');
    }
    async getWriterSubscription(session) {
        return this.subscriptionsService.getMonthlySubscription('stripe custumer id');
    }
};
__decorate([
    (0, common_1.Post)('reader'),
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "createReaderSubscription", null);
__decorate([
    (0, common_1.Get)('reader'),
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "getReaderSubscription", null);
__decorate([
    (0, common_1.Post)('writer'),
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "createWriterSubscription", null);
__decorate([
    (0, common_1.Get)('writer'),
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SubscriptionsController.prototype, "getWriterSubscription", null);
SubscriptionsController = __decorate([
    (0, common_1.Controller)('subscriptions'),
    __metadata("design:paramtypes", [subscriptions_service_1.default])
], SubscriptionsController);
exports.default = SubscriptionsController;
//# sourceMappingURL=subscriptions.controller.js.map