import {IsArray, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { ObjectId } from 'mongoose';
import { UsePipes } from '@nestjs/common';
import { ParseObjectIdPipe } from '../../../util/objectid.validation';


export class PageDto {

    @IsString()
    page: string;

    @IsArray()
    @ValidateNested()
    @Type(() => ChoiceDto)
    choices: ChoiceDto[];
}

class ChoiceDto {

    @IsString()
    cover: ObjectId;

    @IsString()
    choice: string;

    @IsNumber()
    jump_to: ObjectId;
}


