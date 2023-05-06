import { PassportSerializer } from "@nestjs/passport";
import { UserService } from '../../user.service';
import { User } from '../../user.model';
import { ObjectId } from 'mongoose';
export declare class SessionSerializer extends PassportSerializer {
    private readonly userService;
    constructor(userService: UserService);
    serializeUser(user: User, done: (err: any, user: any) => void): void;
    deserializeUser(user_id: ObjectId, done: (err: any, user: any) => void): Promise<void>;
}
