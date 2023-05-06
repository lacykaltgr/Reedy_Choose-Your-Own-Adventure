import { Model, ObjectId } from 'mongoose';
import { ReaderComments } from './reader_comments.model';
export declare class ReaderCommentsService {
    private readonly readerCommentsModel;
    constructor(readerCommentsModel: Model<ReaderComments>);
    getReaderComments(id: ObjectId): Promise<ReaderComments>;
    newCover(): Promise<ReaderComments>;
    addComment(id: ObjectId, user_id: ObjectId, comment: string, username: string): Promise<void>;
    removeComment(id: ObjectId, user_id: ObjectId, comment: string): Promise<void>;
    removeCover(id: ObjectId): Promise<void>;
}
