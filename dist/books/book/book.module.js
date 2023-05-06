"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const book_controller_1 = require("./book.controller");
const book_model_1 = require("./book.model");
const book_service_1 = require("./book.service");
const cover_service_1 = require("../cover/cover.service");
const cover_model_1 = require("../cover/cover.model");
const user_service_1 = require("../../users/user.service");
const author_comments_service_1 = require("../author_comments/author_comments.service");
const user_model_1 = require("../../users/user.model");
const book_stats_service_1 = require("../book_stats/book_stats.service");
const author_comments_model_1 = require("../author_comments/author_comments.model");
const user_stats_service_1 = require("../../users/user_stats/user.stats.service");
const user_stats_model_1 = require("../../users/user_stats/user.stats.model");
const book_stats_model_1 = require("../book_stats/book_stats.model");
const reade_comments_service_1 = require("../reader_comments/reade_comments.service");
let BookModule = class BookModule {
};
BookModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: 'book', schema: book_model_1.BookSchema },
                { name: 'cover', schema: cover_model_1.CoverSchema },
                { name: "user", schema: user_model_1.UserSchema },
                { name: 'author_comments', schema: author_comments_model_1.AuthorCommentSchema },
                { name: 'user_stats', schema: user_stats_model_1.UserStatsSchema },
                { name: 'book_stats', schema: book_stats_model_1.BookStatsSchema }
            ])
        ],
        controllers: [book_controller_1.BookController],
        providers: [book_service_1.BookService, cover_service_1.CoverService, user_service_1.UserService, author_comments_service_1.AuthorCommentsService, book_stats_service_1.BookStatsService, user_stats_service_1.UserStatsService, reade_comments_service_1.ReaderCommentsService]
    })
], BookModule);
exports.BookModule = BookModule;
//# sourceMappingURL=book.module.js.map