import * as mongoose from 'mongoose';
import { ObjectId } from "mongoose";
export declare const Cover: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    title?: string;
    category?: string;
    cover_url?: string;
    author_id?: string;
    book?: mongoose.Types.ObjectId;
}>;
export interface CoverModel extends mongoose.Document {
    id: ObjectId;
    title: string;
    category: string;
    cover_url: string;
    author_id: string;
    book: string;
}
