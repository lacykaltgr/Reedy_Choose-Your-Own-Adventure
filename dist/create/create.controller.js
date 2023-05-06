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
exports.CreateController = void 0;
const common_1 = require("@nestjs/common");
const cover_service_1 = require("../cover/cover.service");
const validation_1 = require("../validation");
const cover_validation_1 = require("../cover/cover.validation");
let CreateController = class CreateController {
    constructor(coverService) {
        this.coverService = coverService;
    }
    async renderCreateMainScreen() {
        const covers = await this.coverService.getAllCover();
        return covers;
    }
    async renderCreateCoverScreen(coverId) {
        const cover = await this.coverService.getCoverById(coverId);
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
    async renderCreateBookScreen(bookId) {
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CreateController.prototype, "renderCreateMainScreen", null);
__decorate([
    (0, common_1.Get)('cover/:coverid'),
    __param(0, (0, common_1.Param)('coverid', validation_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateController.prototype, "renderCreateCoverScreen", null);
__decorate([
    (0, common_1.Post)('cover/new'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cover_validation_1.CoverDto]),
    __metadata("design:returntype", Promise)
], CreateController.prototype, "addCover", null);
__decorate([
    (0, common_1.Post)('cover/:coverid'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('coverid', validation_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cover_validation_1.CoverDto]),
    __metadata("design:returntype", Promise)
], CreateController.prototype, "updateCover", null);
__decorate([
    (0, common_1.Delete)('cover/:coverid'),
    __param(0, (0, common_1.Param)('coverid', validation_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateController.prototype, "deleteCover", null);
__decorate([
    (0, common_1.Get)('page/:bookid'),
    __param(0, (0, common_1.Param)('bookid', validation_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CreateController.prototype, "renderCreateBookScreen", null);
CreateController = __decorate([
    (0, common_1.UseInterceptors)(common_1.CacheInterceptor),
    (0, common_1.Controller)('create'),
    __metadata("design:paramtypes", [cover_service_1.CoverService])
], CreateController);
exports.CreateController = CreateController;
//# sourceMappingURL=create.controller.js.map