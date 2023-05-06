import { UsersModel } from "./user.model";
import { UsersService } from "./users.service";
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    createUser(password: string, username: string): Promise<UsersModel>;
}
