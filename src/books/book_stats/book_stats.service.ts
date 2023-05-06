import { Injectable } from '@nestjs/common';
import { UpdateStatsDto } from './book_stats.validation';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { BookStats } from './book_stats.model';
import { UserStats } from '../../users/user_stats/user.stats.model';
import { catchError } from 'rxjs';

@Injectable()
export class BookStatsService {

  constructor(@InjectModel('book_stats') private readonly bookStatsModel: Model<BookStats>) {
  }

  async updateStats(stats: UpdateStatsDto) {
    try {
      for (let i = 0; i < stats.stats.length; i++) {
        this.bookStatsModel.findByIdAndUpdate(stats.stats[i].book_id, )}
    } catch (error) {
      console.error(error);
    }
  }

  async getStats(id: ObjectId) : Promise<BookStats> {
    try {
      const stats = await this.bookStatsModel.findById(id).exec();
      return stats;
    } catch (error) {
      console.log(error);
    }

  }
}
