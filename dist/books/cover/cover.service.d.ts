import { Model, ObjectId } from "mongoose";
import { Cover } from "./cover.model";
import { CoverDto } from "./cover.validation";
export declare class CoverService {
    private readonly coverModel;
    constructor(coverModel: Model<Cover>);
    getCoverById(id: ObjectId): Promise<Cover>;
    getCovers(coverIds: ObjectId[]): Promise<Cover[]>;
    getCoversByUserId(userId: ObjectId[]): Promise<Cover[]>;
    searchCover(search: string): Promise<Cover[]>;
    insertCover(cover: CoverDto, author_id: ObjectId, author_username: string, book_id: ObjectId): Promise<void>;
    updateCover(id: ObjectId, cover: CoverDto): Promise<void>;
    deleteCoverById(id: ObjectId): Promise<void>;
}
