import { CoverService } from "../cover/cover.service";
import { ObjectId } from 'mongoose';
import { CoverDto } from "../cover/cover.validation";
export declare class CreateController {
    private readonly coverService;
    constructor(coverService: CoverService);
    renderCreateMainScreen(): Promise<import("../cover/cover").Cover[]>;
    renderCreateCoverScreen(coverId: ObjectId): Promise<void>;
    addCover(cover: CoverDto): Promise<void>;
    updateCover(coverId: ObjectId, cover: CoverDto): Promise<void>;
    deleteCover(coverId: ObjectId): Promise<void>;
    renderCreateBookScreen(bookId: ObjectId): Promise<void>;
}
