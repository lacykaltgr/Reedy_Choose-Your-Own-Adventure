import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UserService,
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.getUserByUsername(username);
        if (!user) return null;
        const passwordValid = await bcrypt.compare(password, user.password)

        if (!user)
            throw new NotAcceptableException('could not find the user');
        if (user && passwordValid)
            return user;

        return null;
    }

}
