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
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("mongoose");
const mongoose_2 = require("@nestjs/mongoose");
let BookService = class BookService {
    constructor(bookModel) {
        this.bookModel = bookModel;
    }
    async getBookById(bookid) {
        try {
            const book = await this.bookModel.findById(bookid).exec();
            return book;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
    async saveBook(id, book) {
        try {
            await this.bookModel.findByIdAndUpdate(id, book).exec();
            console.log('Book Updated');
        }
        catch (error) {
            console.error(error);
        }
    }
    async removeBook(bookid) {
        try {
            await this.bookModel.findByIdAndRemove(bookid).exec();
            console.log('Book Deleted');
        }
        catch (error) {
            console.error(error);
        }
    }
    async newBook(title, author_id) {
        try {
            const book = new this.bookModel({
                title,
                author_id,
                pages: []
            });
            return book.save();
        }
        catch (error) {
            console.error(error);
        }
    }
    formatBookForRead(book) {
        return {
            pages: book.pages
        };
    }
};
BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_2.InjectModel)('book')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], BookService);
exports.BookService = BookService;
//# sourceMappingURL=book.service.js.map