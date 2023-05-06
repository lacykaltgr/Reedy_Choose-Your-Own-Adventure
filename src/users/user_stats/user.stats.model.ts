import {ObjectId, Schema, Document} from 'mongoose';



export const UserStatsSchema = new Schema({
  choices_made: [{
    book_id: {
      type: Schema.Types.ObjectId,
      ref: 'book'
    },
    finished: Boolean,
    choices: [{
      type: Schema.Types.ObjectId,
      ref: 'choice',
    }]
  }],
  ratings: [{
    cover_id: {
      type: Schema.Types.ObjectId,
      ref: 'cover',
    },
    rating: Number,
  }],
  list: [{
    type: Schema.Types.ObjectId,
    ref: 'cover',
  }],
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'book',
  }],
  covers: [{
    type: Schema.Types.ObjectId,
    ref: 'cover'
  }]
});

export interface UserStats extends Document {
  choices_made: [{
    book_id: ObjectId,
    finished: boolean,
    choices: ObjectId[]
  }],
  ratings: [{
    cover_id: ObjectId
    rating: number,
  }],
  list: ObjectId[];
  books: ObjectId[];
  covers: ObjectId[];
}