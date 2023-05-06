import { Model } from "mongoose";
import { UsersModel } from "./user.model";
export declare type User = any;
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<UsersModel>);
    createUser(username: string, password: string): Promise<User>;
    getUser(query: object): Promise<User>;
}
