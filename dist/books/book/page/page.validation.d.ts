import { ObjectId } from 'mongoose';
export declare class PageDto {
    page: string;
    choices: ChoiceDto[];
}
declare class ChoiceDto {
    cover: ObjectId;
    choice: string;
    jump_to: ObjectId;
}
export {};
