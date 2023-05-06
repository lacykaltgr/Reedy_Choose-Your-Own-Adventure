import {IsNotEmpty, IsString, IsUrl } from "class-validator";


export class CoverDto  {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    category: string;

    @IsUrl()
    cover_url: string;
}
