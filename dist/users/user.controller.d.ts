import { UserService } from "./user.service";
import { ChangePasswordDto } from './user.validation';
import { AuthService } from './auth/auth.service';
import { User } from './user.model';
import { UserStats } from './user_stats/user.stats.model';
import { UserStatsService } from './user_stats/user.stats.service';
export declare class UserController {
    private readonly usersService;
    private readonly authService;
    private readonly userStatsService;
    constructor(usersService: UserService, authService: AuthService, userStatsService: UserStatsService);
    getMe(session: Record<string, any>): Promise<User>;
    getUserStats(session: Record<string, any>): Promise<UserStats>;
    changePassword(changePasswordDto: ChangePasswordDto, session: Record<string, any>): Promise<void>;
}
