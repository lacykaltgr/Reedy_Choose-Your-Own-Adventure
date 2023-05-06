import { ObjectId } from 'mongoose';
export declare class UpdateStatsDto {
    user_id: ObjectId;
    stats: [
        {
            book_id: ObjectId;
            choices_made: [ObjectId];
        }
    ];
}
