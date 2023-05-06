import { Model, ObjectId } from 'mongoose';
import { UpdateStatsDto } from '../books/book_stats/book_stats.validation';
import { User } from './user.model';
import { UserStatsService } from './user_stats/user.stats.service';
import { CreateUserDto } from './user.validation';
export declare class UserService {
    private readonly userModel;
    private readonly userStatsService;
    constructor(userModel: Model<User>, userStatsService: UserStatsService);
    createUser(user: CreateUserDto): Promise<User>;
    isEmailUnique(email: string): Promise<boolean>;
    isUsernameUnique(username: string): Promise<boolean>;
    getUserByUsername(username: string): Promise<User>;
    getUserById(id: Object): Promise<User>;
    updateStats(stats: UpdateStatsDto): Promise<void>;
    changePassword(user_id: ObjectId, newPassword: string): Promise<void>;
}
