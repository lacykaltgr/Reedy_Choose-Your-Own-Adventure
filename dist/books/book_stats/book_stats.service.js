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
exports.BookStatsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let BookStatsService = class BookStatsService {
    constructor(bookStatsModel) {
        this.bookStatsModel = bookStatsModel;
    }
    async updateStats(stats) {
        try {
            for (let i = 0; i < stats.stats.length; i++) {
                this.bookStatsModel.findByIdAndUpdate(stats.stats[i].book_id);
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async getStats(id) {
        try {
            const stats = await this.bookStatsModel.findById(id).exec();
            return stats;
        }
        catch (error) {
            console.log(error);
        }
    }
};
BookStatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('book_stats')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BookStatsService);
exports.BookStatsService = BookStatsService;
//# sourceMappingURL=book_stats.service.js.map