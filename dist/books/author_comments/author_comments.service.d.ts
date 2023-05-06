import { Model, ObjectId } from 'mongoose';
import { AuthorComments } from './author_comments.model';
import { AuthorCommentsDto } from './author_comments.validation';
export declare class AuthorCommentsService {
    private readonly authorCommentsModel;
    constructor(authorCommentsModel: Model<AuthorComments>);
    getAuthorComments(id: ObjectId): Promise<AuthorComments & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    newBook(bookid: ObjectId): Promise<AuthorComments>;
    updateComments(id: ObjectId, comments: AuthorCommentsDto): Promise<void>;
    removeBook(bookid: ObjectId): Promise<void>;
}
