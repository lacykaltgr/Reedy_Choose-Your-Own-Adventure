import { PassportSerializer } from "@nestjs/passport";
import { Inject, Injectable } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { UserService } from '../../user.service';
import { User } from '../../user.model';
import { Cover } from '../../../books/cover/cover.model';
import { ObjectId } from 'mongoose';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    private readonly userService: UserService
  ) {
    super();
  }

  serializeUser(user: User, done: (err, user) => void) {
    done(null, user.id);
  }

  async deserializeUser(user_id: ObjectId, done: (err, user) => void) {
    const userDB = await this.userService.getUserById(user_id);
    return userDB ? done(null, userDB) : done(null, null)
  }

}