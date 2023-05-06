import { ObjectId } from 'mongoose';

export class UpdateStatsDto {
  user_id: ObjectId;
  stats: [{
    book_id: ObjectId,
    choices_made: [ObjectId],
  }];
}
