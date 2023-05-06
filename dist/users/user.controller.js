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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const local_auth_guard_1 = require("./auth/utils/local.auth.guard");
const user_validation_1 = require("./user.validation");
const auth_service_1 = require("./auth/auth.service");
const user_stats_service_1 = require("./user_stats/user.stats.service");
let UserController = class UserController {
    constructor(usersService, authService, userStatsService) {
        this.usersService = usersService;
        this.authService = authService;
        this.userStatsService = userStatsService;
    }
    async getMe(session) {
        const me = this.usersService.getUserById(session.user.id);
        if (!me)
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        return me;
    }
    async getUserStats(session) {
        const user = await this.usersService.getUserById(session.passport.user);
        const stats = await this.userStatsService.getUserStatsById(user.stats_id);
        return stats;
    }
    async changePassword(changePasswordDto, session) {
        if (!changePasswordDto || !changePasswordDto.currentPassword || !changePasswordDto.newPassword) {
            throw new common_1.HttpException('Missing required fields', common_1.HttpStatus.BAD_REQUEST);
        }
        const user = await this.getMe(session);
        const isPasswordCorrect = await this.authService.validateUser(user.username, changePasswordDto.currentPassword);
        if (!isPasswordCorrect) {
            throw new common_1.HttpException('Incorrect current password', common_1.HttpStatus.BAD_REQUEST);
        }
        try {
            await this.usersService.changePassword(user.id, changePasswordDto.newPassword);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Get)('me'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.Get)('stats'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserStats", null);
__decorate([
    (0, common_1.Post)('change-password'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_validation_1.ChangePasswordDto, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "changePassword", null);
UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        auth_service_1.AuthService,
        user_stats_service_1.UserStatsService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map