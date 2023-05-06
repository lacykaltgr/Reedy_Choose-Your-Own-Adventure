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
exports.AuthorCommentsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let AuthorCommentsService = class AuthorCommentsService {
    constructor(authorCommentsModel) {
        this.authorCommentsModel = authorCommentsModel;
    }
    async getAuthorComments(id) {
        return this.authorCommentsModel.findById(id).exec();
    }
    async newBook(bookid) {
        try {
            const comments = new this.authorCommentsModel({
                notes: null,
                comments: [],
            });
            comments.save();
            console.log('Author Comments created');
            return comments;
        }
        catch (error) {
            console.error(error);
        }
    }
    async updateComments(id, comments) {
        try {
            await this.authorCommentsModel.findByIdAndUpdate(id, comments);
            console.log('Author Comments updated');
        }
        catch (error) {
            console.error(error);
        }
    }
    async removeBook(bookid) {
        try {
            await this.authorCommentsModel.findOneAndDelete({ book_id: bookid });
        }
        catch (error) {
            console.error(error);
        }
    }
};
AuthorCommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('author_comments')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], AuthorCommentsService);
exports.AuthorCommentsService = AuthorCommentsService;
//# sourceMappingURL=author_comments.service.js.map