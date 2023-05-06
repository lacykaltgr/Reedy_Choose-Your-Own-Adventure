import { ReaderCommentsService } from './reade_comments.service';
import { ObjectId } from 'mongoose';
import { ReaderComments } from './reader_comments.model';
import { CommentDto } from './reader_comments.validation';
export declare class ReaderCommentsController {
    private readonly readerCommentsService;
    constructor(readerCommentsService: ReaderCommentsService);
    getReaderComments(id: ObjectId): Promise<ReaderComments>;
    addComment(id: ObjectId, comment: CommentDto): Promise<void>;
    removeComment(id: ObjectId, comment: CommentDto): Promise<void>;
}
