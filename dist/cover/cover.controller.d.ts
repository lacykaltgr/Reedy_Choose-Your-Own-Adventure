import { ObjectId } from 'mongoose';
import { CoverDto } from './cover.validation';
import { CoverService } from './cover.service';
export declare class CoverController {
    private readonly coverService;
    constructor(coverService: CoverService);
    getAllCovers(): Promise<import("./cover").Cover[]>;
    getCover(coverId: ObjectId): Promise<import("./cover").Cover>;
    renderSearchScreen(search: string): Promise<(import("./cover").Cover & {
        _id: import("mongoose").Types.ObjectId;
    })[]>;
    addCover(cover: CoverDto): Promise<void>;
    updateCover(coverId: ObjectId, cover: CoverDto): Promise<void>;
    deleteCover(coverId: ObjectId): Promise<void>;
    getManyCovers(coverIds: ObjectId[]): Promise<import("./cover").Cover[]>;
}
