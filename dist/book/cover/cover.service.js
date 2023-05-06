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
exports.CoverService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let CoverService = class CoverService {
    constructor(coverModel) {
        this.coverModel = coverModel;
    }
    async getCoverById(id) {
        return await this.coverModel.findById(id).exec();
    }
    async getCovers(coverIds) {
        return await this.coverModel.find({ _id: { $in: coverIds } }).exec();
    }
    async searchCover(search) {
        return await this.coverModel.find({
            $or: [{ title: search }, { category: search }]
        }).exec();
    }
    async getAllCover() {
        return await this.coverModel.find().exec();
    }
    async insertCover(cover) {
        const newCover = new this.coverModel(cover);
        return await newCover.save();
    }
    async updateCover(id, cover) {
        const updatedCover = await this.getCoverById(id);
        if (cover.title)
            updatedCover.title = cover.title;
        if (cover.category)
            updatedCover.category = cover.category;
        if (cover.cover_url)
            updatedCover.cover_url = cover.cover_url;
        await updatedCover.save();
    }
    async deleteCoverById(id) {
        return await this.coverModel.findByIdAndDelete(id).exec();
    }
};
CoverService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('cover')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CoverService);
exports.CoverService = CoverService;
//# sourceMappingURL=cover.service.js.map