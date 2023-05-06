import { ObjectId } from 'mongoose';
export declare class AuthorCommentsDto {
    id: ObjectId;
    notes: string;
    comments: [
        {
            page_id: ObjectId;
            comment: string;
        }
    ];
}
