import { Model, ObjectId } from 'mongoose';
import { UserStats } from './user.stats.model';
export declare class UserStatsService {
    private readonly userStats;
    constructor(userStats: Model<UserStats>);
    createUser(): Promise<ObjectId>;
    getUserStatsById(id: ObjectId): Promise<UserStats>;
}
