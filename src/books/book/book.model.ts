import {ObjectId, Schema, Document} from 'mongoose';
import { Page, PageSchema } from './page/page.model';



export const BookSchema = new Schema({
    title: String,
    author_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    pages: [PageSchema],
});

export interface Book extends Document {
    id: ObjectId;
    title: string;

    author_id: ObjectId,
    pages: [Page];
}

