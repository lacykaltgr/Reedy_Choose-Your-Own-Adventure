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
exports.CoverController = void 0;
const common_1 = require("@nestjs/common");
const objectid_validation_1 = require("../../util/objectid.validation");
const cover_validation_1 = require("./cover.validation");
const cover_service_1 = require("./cover.service");
const local_auth_guard_1 = require("../../users/auth/utils/local.auth.guard");
const book_stats_service_1 = require("../book_stats/book_stats.service");
const user_stats_service_1 = require("../../users/user_stats/user.stats.service");
let CoverController = class CoverController {
    constructor(coverService, bookStatsService, userStatService) {
        this.coverService = coverService;
        this.bookStatsService = bookStatsService;
        this.userStatService = userStatService;
    }
    async getCover(coverId) {
        const cover = await this.coverService.getCoverById(coverId);
        if (!cover)
            throw new common_1.HttpException('Cover not found', common_1.HttpStatus.NOT_FOUND);
        return cover;
    }
    async filterCover(search) {
        const result = await this.coverService.searchCover(search);
        if (!result)
            throw new common_1.HttpException('Internal error (could not carry out search)', common_1.HttpStatus.NOT_FOUND);
        return result;
    }
    async updateCover(coverid, cover, session) {
        const user_stats = await this.userStatService.getUserStatsById(session.user.stats_id);
        if (!user_stats.covers.includes(coverid))
            throw new common_1.HttpException('Unauthorized to update cover', common_1.HttpStatus.UNAUTHORIZED);
        try {
            await this.coverService.updateCover(coverid, cover);
            console.log('Cover updated successfully');
        }
        catch (error) {
            console.error(error);
        }
    }
    async unpublishBook(coverid, session) {
        const user_stats = await this.userStatService.getUserStatsById(session.user.stats_id);
        if (!user_stats.covers.includes(coverid))
            throw new common_1.HttpException('Unauthorized to update cover', common_1.HttpStatus.UNAUTHORIZED);
        try {
            await this.coverService.deleteCoverById(coverid);
            console.log('Cover deleted successfully');
        }
        catch (error) {
            console.error(error);
        }
    }
    async getMyBookCovers(session) {
        const covers = await this.coverService.getCoversByUserId(session.user.id);
        if (!covers)
            throw new common_1.HttpException('Cover not found', common_1.HttpStatus.NOT_FOUND);
        return covers;
    }
    async getBookStats(session, stats_id) {
        const stats = await this.bookStatsService.getStats(stats_id);
        if (!stats)
            throw new common_1.HttpException('Stats not found', common_1.HttpStatus.NOT_FOUND);
        if (stats.owner_id != session.user.id)
            throw new common_1.HttpException('Unauthorized to get stats', common_1.HttpStatus.UNAUTHORIZED);
        return stats;
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Get)(':coverid'),
    __param(0, (0, common_1.Param)('coverid', objectid_validation_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "getCover", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Get)('filter'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "filterCover", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Post)('update/:coverid'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('coverid', objectid_validation_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cover_validation_1.CoverDto, Object]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "updateCover", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Delete)('unpublish/:coverid'),
    __param(0, (0, common_1.Param)('coverid', objectid_validation_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "unpublishBook", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Get)('mybooks'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "getMyBookCovers", null);
__decorate([
    (0, common_1.Get)('stats/:statsid'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Param)('statsid', objectid_validation_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "getBookStats", null);
CoverController = __decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('cover'),
    __metadata("design:paramtypes", [cover_service_1.CoverService,
        book_stats_service_1.BookStatsService,
        user_stats_service_1.UserStatsService])
], CoverController);
exports.CoverController = CoverController;
//# sourceMappingURL=cover.controller.js.map