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
exports.ReaderCommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let ReaderCommentsService = class ReaderCommentsService {
    constructor(readerCommentsModel) {
        this.readerCommentsModel = readerCommentsModel;
    }
    async getReaderComments(id) {
        try {
            const comments = await this.readerCommentsModel.findById(id).exec();
            return comments;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async newCover() {
        try {
            const comments = new this.readerCommentsModel({
                comments: [],
            });
            comments.save();
            console.log('Reader Comments created');
            return comments;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async addComment(id, user_id, comment, username) {
        try {
            await this.readerCommentsModel.findByIdAndUpdate(id, { $push: { comments: {
                        user_id,
                        username,
                        comment,
                        timestamp: Date.now(),
                    } } });
            console.log('Reader Comment added');
        }
        catch (error) {
            console.error(error);
        }
    }
    async removeComment(id, user_id, comment) {
        try {
            await this.readerCommentsModel.findByIdAndUpdate(id, { $pull: { comments: {
                        user_id,
                        comment,
                    } } });
            console.log('Reader Comment deleted');
        }
        catch (error) {
            console.error(error);
        }
    }
    async removeCover(id) {
        try {
            await this.readerCommentsModel.findByIdAndDelete(id);
        }
        catch (error) {
            console.error(error);
        }
    }
};
ReaderCommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('author_comments')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], ReaderCommentsService);
exports.ReaderCommentsService = ReaderCommentsService;
//# sourceMappingURL=reade_comments.service.js.map