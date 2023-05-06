import { ObjectId } from 'mongoose';
import { CoverDto } from './cover.validation';
import { CoverService } from './cover.service';
import { BookStatsService } from '../book_stats/book_stats.service';
import { UserStatsService } from '../../users/user_stats/user.stats.service';
export declare class CoverController {
    private readonly coverService;
    private readonly bookStatsService;
    private readonly userStatService;
    constructor(coverService: CoverService, bookStatsService: BookStatsService, userStatService: UserStatsService);
    getCover(coverId: ObjectId): Promise<import("./cover.model").Cover>;
    filterCover(search: string): Promise<import("./cover.model").Cover[]>;
    updateCover(coverid: ObjectId, cover: CoverDto, session: Record<string, any>): Promise<void>;
    unpublishBook(coverid: ObjectId, session: Record<string, any>): Promise<void>;
    getMyBookCovers(session: Record<string, any>): Promise<import("./cover.model").Cover[]>;
    getBookStats(session: Record<string, any>, stats_id: ObjectId): Promise<import("../book_stats/book_stats.model").BookStats>;
}
