import {AuthService} from "./auth.service";
import {
    Body,
    CacheInterceptor,
    ClassSerializerInterceptor,
    Controller,
    Get,
    Post,
    Session,
    UseGuards,
    UseInterceptors, UsePipes, ValidationPipe,
} from '@nestjs/common';
import { AuthenticatedGuard, LocalAuthGuard } from './utils/local.auth.guard';
import {Request} from "@nestjs/common"
import { SessionSerializer } from './utils/session_serializer';
import { CreateUserDto } from '../user.validation';
import { User } from '../user.model';
import { UserService } from '../user.service';
import * as bcrypt from 'bcrypt';

@UseInterceptors(SessionSerializer)
@Controller()
export class AuthController {

    constructor(
      private readonly authService: AuthService,
      private readonly  usersService: UserService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login() {
        return { message: 'Successfully logged in.' };
    }


    @Post('logout')
    async logout(@Session() session: Record<string, any>) {
        session.destroy();
        return { message: 'Successfully logged out.' };
    }


    @UseGuards(AuthenticatedGuard)
    @Get('session')
    getMe(@Session() session: Record<string, any>) {
        return session;
    }

    @Post('signup')
    @UsePipes(new ValidationPipe())
    async createUser(
      @Body() auth: CreateUserDto,
    ): Promise<any> {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(auth.password, saltOrRounds);
        await this.usersService.createUser({
            username: auth.username,
            password: hashedPassword,
            email: auth.email
        });
        return {
            message: "Successfully created user",
            username: auth.username,
        };
    }

}