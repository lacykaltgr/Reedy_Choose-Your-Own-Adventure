import { UpdateStatsDto } from './book_stats.validation';
import { Model, ObjectId } from 'mongoose';
import { BookStats } from './book_stats.model';
export declare class BookStatsService {
    private readonly bookStatsModel;
    constructor(bookStatsModel: Model<BookStats>);
    updateStats(stats: UpdateStatsDto): Promise<void>;
    getStats(id: ObjectId): Promise<BookStats>;
}
