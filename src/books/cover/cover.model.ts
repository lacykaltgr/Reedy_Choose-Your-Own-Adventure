import {ObjectId, Schema, Document} from "mongoose";


export const CoverSchema = new Schema({
    title: String,
    category: String,
    description: String,
    author_name: String,
    cover_url: String,
    author_id:
        {
        type: Schema.Types.ObjectId,
        ref: 'author',
        },
    book_id : {
        type: Schema.Types.ObjectId,
        ref: 'book'
    },
    price: Number,
    publication_date: Date,
    owner_id: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    reader_comments_id: {
        type: Schema.Types.ObjectId,
        ref: 'reader-comments'
    }

});

export interface Cover extends Document {
    id: ObjectId;
    title: string;
    category: string;
    description: string;
    author_name: string;
    cover_url: string;
    author_id: ObjectId;
    book_id: ObjectId;
    price: number;
    publication_date: Date;
    owner_id: ObjectId;
    reader_comments_id: ObjectId;
}
