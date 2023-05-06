import { ObjectId } from 'mongoose';

export class CommentDto {
  user_id: ObjectId;
  username: string;
  text: string;

}

