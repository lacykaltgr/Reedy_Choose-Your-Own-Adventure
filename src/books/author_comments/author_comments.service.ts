import { Injectable } from '@nestjs/common';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Cover } from '../cover/cover.model';
import { AuthorComments } from './author_comments.model';
import { AuthorCommentsDto } from './author_comments.validation';

@Injectable()
export class AuthorCommentsService {

  constructor(
    @InjectModel('author_comments') private readonly authorCommentsModel: Model<AuthorComments>,
  ) {}

  async getAuthorComments(id: ObjectId) {
    return this.authorCommentsModel.findById(id).exec();
  }

  async newBook(bookid: ObjectId) : Promise<AuthorComments>{
    try {
      const comments = new this.authorCommentsModel({
        notes: null,
        comments: [],
      });
      comments.save();
      console.log('Author Comments created');
      return comments;
    } catch (error) {
      console.error(error);
    }
  }

  async updateComments(id: ObjectId, comments: AuthorCommentsDto) {
    try {
      await this.authorCommentsModel.findByIdAndUpdate(id, comments);
      console.log('Author Comments updated');
    } catch (error) {
      console.error(error)
    }
  }

  async removeBook(bookid: ObjectId) {
    try {
      await this.authorCommentsModel.findOneAndDelete({book_id: bookid});
    } catch (error) {
      console.error(error);
    }
  }
}
