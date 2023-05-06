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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_stats_service_1 = require("./user_stats/user.stats.service");
let UserService = class UserService {
    constructor(userModel, userStatsService) {
        this.userModel = userModel;
        this.userStatsService = userStatsService;
    }
    async createUser(user) {
        const isUsernameUnique = await this.isUsernameUnique(user.username);
        if (!isUsernameUnique)
            throw new common_1.HttpException("Username taken", common_1.HttpStatus.CONFLICT);
        const isEmailUnique = await this.isEmailUnique(user.email);
        if (!isEmailUnique)
            throw new common_1.HttpException("There is already an account with this email address", common_1.HttpStatus.CONFLICT);
        const user_stats_id = await this.userStatsService.createUser();
        const newUser = new this.userModel({
            username: user.username,
            password: user.password,
            language: "Hungarian",
            stats: user_stats_id,
            readerSubscription: false,
            writerSubscription: false,
        });
        await newUser.save();
        return newUser;
    }
    async isEmailUnique(email) {
        const user_with_email = await this.userModel.findOne({ email });
        return !user_with_email;
    }
    async isUsernameUnique(username) {
        const user_with_username = await this.userModel.findOne({ username });
        return !user_with_username;
    }
    async getUserByUsername(username) {
        return this.userModel.findOne({ username });
    }
    async getUserById(id) {
        return await this.userModel.findById(id).exec();
    }
    async updateStats(stats) {
    }
    async changePassword(user_id, newPassword) {
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('user')),
    __metadata("design:paramtypes", [mongoose_2.Model,
        user_stats_service_1.UserStatsService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map