import {IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { UsePipes } from '@nestjs/common';
import { ParseObjectIdPipe } from '../../util/objectid.validation';
import { PageDto } from './page/page.validation';


export class BookDto {
    title: string;

    id: ObjectId;

    @IsArray()
    @ValidateNested()
    @Type(() => PageDto)
    pages: PageDto[];

    @IsString()
    author_id: ObjectId;

}

