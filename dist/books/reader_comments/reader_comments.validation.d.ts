import { ObjectId } from 'mongoose';
export declare class CommentDto {
    user_id: ObjectId;
    username: string;
    text: string;
}
