import {ObjectId, Schema, Document} from 'mongoose';
import { Page, PageSchema } from '../book/page/page.model';



export const BookStatsSchema = new Schema({

  cover_id: {
    type: Schema.Types.ObjectId,
    ref: 'cover'
  },

  owner_id: {
    type: Schema.Types.ObjectId,
    ref: 'user'
  },

  opened: Number,

  open_history: [{
    timestamp: Date,
    value: Number,
  }],

  choices_made: [{
    choice_id: {
      type: Schema.Types.ObjectId,
      ref: 'choice'
    },
    count: Number,
  }],

  transactions: [{
    from: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    to: {
      type: Schema.Types.ObjectId,
      ref: 'user'
    },
    amount: Number,
    timestamp: Date,
  }]
});

export interface BookStats extends Document {

  cover_id: ObjectId;
  owner_id: ObjectId;
  opened: number;
  open_history: [{
    timestamp: Date,
    value: number,
  }];
  choices_made: [{
    choice_id: ObjectId,
    count: number,
  }];
  transactions: [{
    from: ObjectId,
    to: ObjectId,
    amount: number,
    timestamp: Date,
  }]
}