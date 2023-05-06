import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsNotEmpty()
    username: string;

    //@IsString()
    //@IsEmail()
    //email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsEmail()
    email: string;
}

export class ChangePasswordDto {
    currentPassword: string;
    newPassword: string;
}

