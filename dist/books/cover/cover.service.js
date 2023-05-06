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
        try {
            const cover = await this.coverModel.findById(id).exec();
            return cover;
        }
        catch (error) {
            console.error(error);
        }
    }
    async getCovers(coverIds) {
        try {
            const covers = await this.coverModel.find({ _id: { $in: coverIds } }).exec();
            return covers;
        }
        catch (error) {
            console.error(error);
        }
    }
    async getCoversByUserId(userId) {
        try {
            const covers = await this.coverModel.find({ author_id: userId }).exec();
            return covers;
        }
        catch (error) {
            console.error(error);
        }
    }
    async searchCover(search) {
        return null;
    }
    async insertCover(cover, author_id, author_username, book_id) {
        try {
            const newCover = new this.coverModel(cover);
            await newCover.save();
            console.log('Cover created successfully');
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateCover(id, cover) {
        try {
            const updatedCover = await this.getCoverById(id);
            if (cover.title)
                updatedCover.title = cover.title;
            if (cover.category)
                updatedCover.category = cover.category;
            if (cover.cover_url)
                updatedCover.cover_url = cover.cover_url;
            await updatedCover.save();
            console.log('Cover updated successfully');
        }
        catch (error) {
            console.error(error);
        }
    }
    async deleteCoverById(id) {
        try {
            await this.coverModel.findByIdAndDelete(id).exec();
            console.log('Cover deleted successfully');
        }
        catch (error) {
            console.error(error);
        }
    }
};
CoverService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('cover')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], CoverService);
exports.CoverService = CoverService;
//# sourceMappingURL=cover.service.js.map