import { Model, ObjectId } from 'mongoose';
import { BookDto } from './book.validation';
import { Book } from './book.model';
export declare class BookService {
    private readonly bookModel;
    constructor(bookModel: Model<Book>);
    getBookById(bookid: ObjectId): Promise<Book>;
    saveBook(id: ObjectId, book: BookDto): Promise<void>;
    removeBook(bookid: ObjectId): Promise<void>;
    newBook(title: string, author_id: ObjectId): Promise<Book>;
    formatBookForRead(book: Book): {
        pages: [import("./page/page.model").Page];
    };
}
