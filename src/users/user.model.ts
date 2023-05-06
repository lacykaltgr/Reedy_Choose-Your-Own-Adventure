import {ObjectId, Schema} from "mongoose";

export const UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    language: String,
    stats_id: {
        type: Schema.Types.ObjectId,
        ref: 'user_stats'
    },
    stripeCustomerId: String,
    readerSubscription: Boolean,
    writerSubscription: Boolean,

});

export interface User extends Document {
    id: ObjectId;
    username: string;
    email: string;
    password: string;

    stats_id: ObjectId;
    language: string;
    stripeCustomerId: string;
    readerSubscription: boolean;
    writerSubscription: boolean;
}
