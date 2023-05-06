/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { BookService } from './book.service';
import { ObjectId } from 'mongoose';
import { CoverDto } from '../cover/cover.validation';
import { CoverService } from '../cover/cover.service';
import { BookDto } from './book.validation';
import { UserService } from '../../users/user.service';
import { BookStatsService } from '../book_stats/book_stats.service';
import { AuthorCommentsService } from '../author_comments/author_comments.service';
import { UserStatsService } from '../../users/user_stats/user.stats.service';
import { UpdateStatsDto } from '../book_stats/book_stats.validation';
import { AuthorCommentsDto } from '../author_comments/author_comments.validation';
import { ReaderCommentsService } from '../reader_comments/reade_comments.service';
import { Page } from './page/page.model';
export declare class BookController {
    private readonly bookService;
    private readonly coverService;
    private readonly userService;
    private readonly userStatsService;
    private readonly bookstatsService;
    private readonly authorCommentsService;
    private readonly readerCommentsService;
    constructor(bookService: BookService, coverService: CoverService, userService: UserService, userStatsService: UserStatsService, bookstatsService: BookStatsService, authorCommentsService: AuthorCommentsService, readerCommentsService: ReaderCommentsService);
    getBook(bookid: ObjectId): Promise<{
        pages: [Page];
    }>;
    updateStats(stats: UpdateStatsDto, session: Record<string, any>): Promise<{
        message: string;
    }>;
    getMyBooks(session: Record<string, any>): Promise<import("../cover/cover.model").Cover[]>;
    newBook(session: Record<string, any>, title: string): Promise<{
        message: string;
        book: import("./book.model").Book;
        author_comments: import("../author_comments/author_comments.model").AuthorComments;
    }>;
    saveBook(session: Record<string, any>, book: BookDto, author_comments: AuthorCommentsDto): Promise<{
        message: string;
    }>;
    removeBook(bookid: ObjectId, session: Record<string, any>): Promise<{
        message: string;
    }>;
    publishBook(bookid: ObjectId, cover: CoverDto, session: Record<string, any>): Promise<{
        message: string;
    }>;
    editBook(bookid: ObjectId, session: Record<string, any>): Promise<{
        book: import("./book.model").Book;
        comments: import("../author_comments/author_comments.model").AuthorComments & {
            _id: import("mongoose").Types.ObjectId;
        };
    }>;
}
