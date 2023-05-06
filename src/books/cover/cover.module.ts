import {CacheModule, Module} from '@nestjs/common';
import { CoverService } from './cover.service';
import {MongooseModule} from "@nestjs/mongoose";
import {PageSchema} from "../book/page/page.model";
import {CoverSchema} from "./cover.model";
import { CoverController } from './cover.controller';
import { CoverImageService } from './cover.image/cover.image.service';
import { BookStatsService } from '../book_stats/book_stats.service';
import { BookStatsSchema } from '../book_stats/book_stats.model';
import { UserStatsService } from '../../users/user_stats/user.stats.service';
import { UserStatsSchema } from '../../users/user_stats/user.stats.model';

@Module({
  imports: [MongooseModule.forFeature([
    {name: 'page', schema: PageSchema},
    {name: 'cover', schema: CoverSchema},
    {name: 'user_stats', schema: UserStatsSchema},
    {name: 'book_stats', schema: BookStatsSchema}])],
  providers: [CoverService, CoverImageService, BookStatsService, UserStatsService],
  controllers: [ CoverController ]
})
export class CoverModule {}