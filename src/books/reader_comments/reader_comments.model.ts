import {ObjectId, Schema, Document} from 'mongoose';
import { Page, PageSchema } from '../book/page/page.model';



export const ReaderCommentSchema = new Schema({
  comments: [{
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'page'
    },
    username: String,
    comment: String,
    timestamp: Date,
  }]
});

export interface ReaderComments extends Document {
  id: ObjectId;
  comments: [{
    user_id: ObjectId;
    username: string;
    comment: string;
    timestamp: Date;
  }]
}