import {ObjectId, Schema, Document} from 'mongoose';



export const PageSchema = new Schema({
    cover: {
      type: Schema.Types.ObjectId,
      ref: 'cover'
    },
    page: String,
    choices: [
        {
            choice: String,
            jump_to: Schema.Types.ObjectId,
        }
    ]
});

export interface Page extends Document {
    id: ObjectId;
    cover: ObjectId;
    page: string;
    choices: [
      {
          choice: string,
          jump_to: ObjectId
      }
      ];
}

