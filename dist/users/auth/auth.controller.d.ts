import { AuthService } from "./auth.service";
import { CreateUserDto } from '../user.validation';
import { UserService } from '../user.service';
export declare class AuthController {
    private readonly authService;
    private readonly usersService;
    constructor(authService: AuthService, usersService: UserService);
    login(): Promise<{
        message: string;
    }>;
    logout(session: Record<string, any>): Promise<{
        message: string;
    }>;
    getMe(session: Record<string, any>): Record<string, any>;
    createUser(auth: CreateUserDto): Promise<any>;
}
