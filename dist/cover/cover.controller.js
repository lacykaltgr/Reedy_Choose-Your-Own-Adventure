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
const objectid_validation_1 = require("../util/objectid.validation");
const cover_validation_1 = require("./cover.validation");
const cover_service_1 = require("./cover.service");
const local_auth_guard_1 = require("../auth/utils/local.auth.guard");
let CoverController = class CoverController {
    constructor(coverService) {
        this.coverService = coverService;
    }
    async getAllCovers() {
        const covers = await this.coverService.getAllCover();
        return covers;
    }
    async getCover(coverId) {
        const cover = await this.coverService.getCoverById(coverId);
        return cover;
    }
    async renderSearchScreen(search) {
        const result = await this.coverService.searchCover(search);
        return result;
    }
    async addCover(cover) {
        await this.coverService.insertCover(cover);
        console.log("cover inserted");
    }
    async updateCover(coverId, cover) {
        await this.coverService.updateCover(coverId, cover);
        console.log('cover updated');
    }
    async deleteCover(coverId) {
        await this.coverService.deleteCoverById(coverId);
        console.log('cover updated');
    }
    async getManyCovers(coverIds) {
        const covers = this.coverService.getCovers(coverIds);
        return covers;
    }
};
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "getAllCovers", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Get)(':coverid'),
    __param(0, (0, common_1.Param)('coverid', objectid_validation_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "getCover", null);
__decorate([
    (0, common_1.Get)('search/:search'),
    __param(0, (0, common_1.Param)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "renderSearchScreen", null);
__decorate([
    (0, common_1.Post)('new'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cover_validation_1.CoverDto]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "addCover", null);
__decorate([
    (0, common_1.Post)(':coverid'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('coverid', objectid_validation_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cover_validation_1.CoverDto]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "updateCover", null);
__decorate([
    (0, common_1.Delete)(':coverid'),
    __param(0, (0, common_1.Param)('coverid', objectid_validation_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "deleteCover", null);
__decorate([
    (0, common_1.UsePipes)(objectid_validation_1.ParseObjectIdPipe),
    (0, common_1.Get)('history'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Array]),
    __metadata("design:returntype", Promise)
], CoverController.prototype, "getManyCovers", null);
CoverController = __decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('cover'),
    __metadata("design:paramtypes", [cover_service_1.CoverService])
], CoverController);
exports.CoverController = CoverController;
//# sourceMappingURL=cover.controller.js.map