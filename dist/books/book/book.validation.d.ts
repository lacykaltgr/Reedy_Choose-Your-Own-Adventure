import { ObjectId } from 'mongoose';
import { PageDto } from './page/page.validation';
export declare class BookDto {
    title: string;
    id: ObjectId;
    pages: PageDto[];
    author_id: ObjectId;
}
