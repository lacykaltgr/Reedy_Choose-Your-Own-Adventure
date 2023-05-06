import { Model, ObjectId } from "mongoose";
import { Cover } from "./cover";
import { CoverDto } from "./cover.validation";
export declare class CoverService {
    private readonly coverModel;
    constructor(coverModel: Model<Cover>);
    getCoverById(id: ObjectId): Promise<Cover>;
    getCovers(coverIds: ObjectId[]): Promise<Cover[]>;
    searchCover(search: string): Promise<(Cover & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    getAllCover(): Promise<Cover[]>;
    insertCover(cover: CoverDto): Promise<Cover & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    updateCover(id: ObjectId, cover: CoverDto): Promise<void>;
    deleteCoverById(id: ObjectId): Promise<Cover & {
        _id: import("mongoose").Types.ObjectId;
    }>;
}
