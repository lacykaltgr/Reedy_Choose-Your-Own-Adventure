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
exports.BookController = void 0;
const common_1 = require("@nestjs/common");
const book_service_1 = require("./book.service");
const objectid_validation_1 = require("../../util/objectid.validation");
const cover_validation_1 = require("../cover/cover.validation");
const cover_service_1 = require("../cover/cover.service");
const local_auth_guard_1 = require("../../users/auth/utils/local.auth.guard");
const book_validation_1 = require("./book.validation");
const user_service_1 = require("../../users/user.service");
const book_stats_service_1 = require("../book_stats/book_stats.service");
const author_comments_service_1 = require("../author_comments/author_comments.service");
const user_stats_service_1 = require("../../users/user_stats/user.stats.service");
const book_stats_validation_1 = require("../book_stats/book_stats.validation");
const author_comments_validation_1 = require("../author_comments/author_comments.validation");
const reade_comments_service_1 = require("../reader_comments/reade_comments.service");
let BookController = class BookController {
    constructor(bookService, coverService, userService, userStatsService, bookstatsService, authorCommentsService, readerCommentsService) {
        this.bookService = bookService;
        this.coverService = coverService;
        this.userService = userService;
        this.userStatsService = userStatsService;
        this.bookstatsService = bookstatsService;
        this.authorCommentsService = authorCommentsService;
        this.readerCommentsService = readerCommentsService;
    }
    async getBook(bookid) {
        const book = await this.bookService.getBookById(bookid);
        if (!book) {
            throw new common_1.HttpException('Book not found', common_1.HttpStatus.NOT_FOUND);
        }
        return this.bookService.formatBookForRead(book);
    }
    async updateStats(stats, session) {
        if (session.user.id != stats.user_id)
            throw new common_1.HttpException('Unauthorized stat update', common_1.HttpStatus.UNAUTHORIZED);
        try {
            await this.userService.updateStats(stats);
            await this.bookstatsService.updateStats(stats);
            return { message: 'Stats updated successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getMyBooks(session) {
        const covers = await this.coverService.getCoversByUserId(session.user.username);
        if (!covers) {
            throw new common_1.HttpException('Covers not found', common_1.HttpStatus.NOT_FOUND);
        }
        return covers;
    }
    async newBook(session, title) {
        try {
            const book = await this.bookService.newBook(title, session.user.id);
            const author_comments = await this.authorCommentsService.newBook(book.id);
            return {
                message: 'Book created successfully',
                book,
                author_comments
            };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async saveBook(session, book, author_comments) {
        const user_stats = await this.userStatsService.getUserStatsById(session.user.stats_id);
        if (!user_stats.books.includes(book.id))
            throw new common_1.HttpException('Unauthorzed to save book', common_1.HttpStatus.UNAUTHORIZED);
        try {
            await this.authorCommentsService.updateComments(book.id, author_comments);
            await this.bookService.saveBook(book.id, book);
            return { message: 'Book saved successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async removeBook(bookid, session) {
        const user_stats = await this.userStatsService.getUserStatsById(session.user.stats_id);
        if (!user_stats.books.includes(bookid))
            throw new common_1.HttpException('Unauthorzed to remove book', common_1.HttpStatus.UNAUTHORIZED);
        try {
            await this.authorCommentsService.removeBook(bookid);
            await this.bookService.removeBook(bookid);
            return { message: 'Book deleted successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async publishBook(bookid, cover, session) {
        const user_stats = await this.userStatsService.getUserStatsById(session.user.stats_id);
        if (!user_stats.books.includes(bookid))
            throw new common_1.HttpException('Unauthorzed to save book', common_1.HttpStatus.UNAUTHORIZED);
        try {
            await this.readerCommentsService.newCover();
            await this.coverService.insertCover(cover, session.user.id, session.user.username, bookid);
            return { message: 'Book published successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async editBook(bookid, session) {
        const user_stats = await this.userStatsService.getUserStatsById(session.user.stats_id);
        if (!user_stats.books.includes(bookid))
            throw new common_1.HttpException('Unauthorzed to edit book', common_1.HttpStatus.UNAUTHORIZED);
        const book = await this.bookService.getBookById(bookid);
        const author_comments = await this.authorCommentsService.getAuthorComments(book.id);
        if (!book || !author_comments)
            throw new common_1.HttpException('Covers not found', common_1.HttpStatus.NOT_FOUND);
        return {
            book: book,
            comments: author_comments
        };
    }
};
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Get)(':bookid'),
    __param(0, (0, common_1.Param)('bookid', objectid_validation_1.ParseObjectIdPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getBook", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Post)('stat-update'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [book_stats_validation_1.UpdateStatsDto, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "updateStats", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Get)('mybooks'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "getMyBooks", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Post)('new'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)('title')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "newBook", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.AuthenticatedGuard),
    (0, common_1.Post)('save'),
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Body)('book')),
    __param(2, (0, common_1.Body)('author_comments')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, book_validation_1.BookDto,
        author_comments_validation_1.AuthorCommentsDto]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "saveBook", null);
__decorate([
    (0, common_1.Delete)(':bookid'),
    __param(0, (0, common_1.Param)('bookid', objectid_validation_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "removeBook", null);
__decorate([
    (0, common_1.Post)('publish/:bookid'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('bookid', objectid_validation_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, cover_validation_1.CoverDto, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "publishBook", null);
__decorate([
    (0, common_1.UsePipes)(common_1.ValidationPipe),
    (0, common_1.Get)('edit/:bookid'),
    __param(0, (0, common_1.Param)('bookid', objectid_validation_1.ParseObjectIdPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], BookController.prototype, "editBook", null);
BookController = __decorate([
    (0, common_1.Controller)('book'),
    __metadata("design:paramtypes", [book_service_1.BookService,
        cover_service_1.CoverService,
        user_service_1.UserService,
        user_stats_service_1.UserStatsService,
        book_stats_service_1.BookStatsService,
        author_comments_service_1.AuthorCommentsService,
        reade_comments_service_1.ReaderCommentsService])
], BookController);
exports.BookController = BookController;
//# sourceMappingURL=book.controller.js.map