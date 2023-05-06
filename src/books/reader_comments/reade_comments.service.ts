import { Injectable } from '@nestjs/common';
import { Model, ObjectId, Schema } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ReaderComments } from './reader_comments.model';


@Injectable()
export class ReaderCommentsService {

  constructor(
    @InjectModel('author_comments') private readonly readerCommentsModel: Model<ReaderComments>,
  ) {}

  async getReaderComments(id: ObjectId) : Promise<ReaderComments> {
    try {
      const comments = await this.readerCommentsModel.findById(id).exec();
      return comments;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async newCover() : Promise<ReaderComments>{
    try {
      const comments = new this.readerCommentsModel({
        comments: [],
      });
      comments.save();
      console.log('Reader Comments created');
      return comments;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  async addComment(id: ObjectId, user_id: ObjectId, comment: string, username: string) {
    try {
      await this.readerCommentsModel.findByIdAndUpdate(id, {$push: {comments: {
            user_id,
            username,
            comment,
            timestamp: Date.now(),
          }}});
      console.log('Reader Comment added');
    } catch (error) {
      console.error(error)
    }
  }

  async removeComment(id: ObjectId, user_id: ObjectId, comment: string,) {
    try {
      await this.readerCommentsModel.findByIdAndUpdate(id, {$pull: {comments: {
            user_id,
            comment,
          }}});
      console.log('Reader Comment deleted');
    } catch (error) {
      console.error(error)
    }
  }

  async removeCover(id: ObjectId) {
    try {
      await this.readerCommentsModel.findByIdAndDelete(id);
    } catch (error) {
      console.error(error);
    }
  }
}
