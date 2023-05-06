import { PassportSerializer } from "@nestjs/passport";
import { UserService } from '../../users/user.service';
import { User } from '../../users/user.model';
export declare class SessionSerializer extends PassportSerializer {
    private readonly userService;
    constructor(userService: UserService);
    serializeUser(user: User, done: (err: any, user: any) => void): void;
    deserializeUser(user: User, done: (err: any, user: any) => void): Promise<void>;
}
