import { ObjectId, Schema } from 'mongoose';
import * as mongoose from "mongoose";
export declare const Book: Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    pages: {
        choices: {
            choice?: string;
            jump_to?: number;
        }[];
        page_number?: number;
        page?: string;
    }[];
}>;
export interface BookModel extends mongoose.Document {
    id: ObjectId;
    pages: [
        {
            page_number: number;
            page: string;
            choices: [
                {
                    choice: string;
                    jump_to: number;
                }
            ];
        }
    ];
}
