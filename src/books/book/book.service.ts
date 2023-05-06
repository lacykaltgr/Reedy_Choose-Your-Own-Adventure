import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { BookDto } from './book.validation';
import { Book } from './book.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class BookService {

  constructor(@InjectModel('book') private readonly bookModel: Model<Book>) {
  }

  async getBookById(bookid: ObjectId): Promise<Book> {
    try {
      const book = await this.bookModel.findById(bookid).exec();
      return book;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async saveBook(id: ObjectId, book: BookDto) {
    try {
      await this.bookModel.findByIdAndUpdate(id, book).exec();
      console.log('Book Updated')
    } catch (error) {
      console.error(error);
    }
  }

  async removeBook(bookid: ObjectId) {
    try {
      await this.bookModel.findByIdAndRemove(bookid).exec();
      console.log('Book Deleted')
    } catch (error) {
      console.error(error);
    }
  }

  async newBook(title: string, author_id: ObjectId): Promise<Book> {
    try {
      const book = new this.bookModel({
        title,
        author_id,
        pages: []
      });
      return book.save();
    } catch (error) {
      console.error(error)
    }
  }

  formatBookForRead(book: Book) {
    return {
      pages: book.pages
    };
  }
}
