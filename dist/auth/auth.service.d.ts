import { UserService } from '../users/user.service';
export declare class AuthService {
    private readonly usersService;
    constructor(usersService: UserService);
    validateUser(username: string, password: string): Promise<any>;
}
