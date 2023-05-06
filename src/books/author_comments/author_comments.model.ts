import {ObjectId, Schema, Document} from 'mongoose';
import { Page, PageSchema } from '../book/page/page.model';



export const AuthorCommentSchema = new Schema({
  book_id: {
    type: Schema.Types.ObjectId,
    ref: 'book'
  },
  notes: String,
  comments: [{
    page_id: {
      type: Schema.Types.ObjectId,
      ref: 'page'
    },
    comment: String,
  }]
});

export interface AuthorComments extends Document {
  id: ObjectId;
  book_id: ObjectId;
  notes: string;
  comments: [{
    page_id: ObjectId;
    comment: string;
  }]
}