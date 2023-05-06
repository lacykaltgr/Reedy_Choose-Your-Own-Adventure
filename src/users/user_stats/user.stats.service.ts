import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { UserStats } from './user.stats.model';

@Injectable()
export class UserStatsService {
  constructor(
    @InjectModel('user_stats') private readonly userStats: Model<UserStats>
  ) {}


  async createUser() : Promise<ObjectId> {
    const stats = new this.userStats({
      choices_made: [],
      ratings: [],
      list: [],
      books: [],
      covers: []
    })
    await stats.save();
    return stats.id;
  }

  async getUserStatsById(id: ObjectId) : Promise<UserStats> {
    const stats = await this.userStats.findById(id).exec();
    return stats;
  }
}
