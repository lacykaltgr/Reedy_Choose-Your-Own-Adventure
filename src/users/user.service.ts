import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import { Model, ObjectId } from 'mongoose';
import { UpdateStatsDto } from '../books/book_stats/book_stats.validation';
import { PaymentsService } from './payments/payments.service';
import { User } from './user.model';
import { UserStats } from './user_stats/user.stats.model';
import { UserStatsService } from './user_stats/user.stats.service';
import { CreateUserDto } from './user.validation';


@Injectable()
export class UserService {

    constructor(
      @InjectModel('user') private readonly userModel: Model<User>,
      private readonly userStatsService: UserStatsService,
      //private readonly paymentsService: PaymentsService
    ) {}

    async createUser(user: CreateUserDto): Promise<User> {
        //validate username and email
        const isUsernameUnique = await this.isUsernameUnique(user.username);
        if (!isUsernameUnique)
            throw new HttpException("Username taken", HttpStatus.CONFLICT);
        const isEmailUnique = await this.isEmailUnique(user.email);
        if (!isEmailUnique)
            throw new HttpException("There is already an account with this email address", HttpStatus.CONFLICT);

        //create stripe account
        //const stripeCustomer = await this.paymentsService.createCustomer(username, password);

        //create user stats document
        const user_stats_id = await this.userStatsService.createUser();

        //create user
        const newUser = new this.userModel({
            username: user.username,
            password: user.password,
            //stripeCustomerId: stripeCustomer.id,
            language: "Hungarian",
            stats: user_stats_id,
            readerSubscription: false,
            writerSubscription: false,
        })
        await newUser.save();
        return newUser;
    }

    async isEmailUnique(email: string) : Promise<boolean> {
        const user_with_email = await this.userModel.findOne({email});
        return !user_with_email;
    }

    async isUsernameUnique(username: string) : Promise<boolean> {
        const user_with_username = await this.userModel.findOne({username});
        return !user_with_username;
    }



    async getUserByUsername(username: string ): Promise<User> {
        return this.userModel.findOne({ username });
    }

    async getUserById(id: Object) : Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async updateStats(stats: UpdateStatsDto) {

    }

    async changePassword(user_id: ObjectId, newPassword: string) {

    }
}
