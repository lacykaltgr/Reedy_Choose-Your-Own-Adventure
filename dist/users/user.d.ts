import * as mongoose from 'mongoose';
import { ObjectId } from "mongoose";
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    users?: string;
    password?: string;
}>;
export interface User extends mongoose.Document {
    id: ObjectId;
    user: string;
    password: string;
}
