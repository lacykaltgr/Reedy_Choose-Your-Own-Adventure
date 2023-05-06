import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Model, ObjectId } from "mongoose";
import { Cover } from "./cover.model";
import { InjectModel } from "@nestjs/mongoose";
import { CoverDto } from "./cover.validation";


@Injectable()
export class CoverService {

    constructor(
        @InjectModel('cover') private readonly coverModel: Model<Cover>,
    ) {}

    async getCoverById(id: ObjectId) : Promise<Cover> {
        try {
            const cover = await this.coverModel.findById(id).exec();
            return cover;
        } catch (error) {
            console.error(error);
        }
    }

    async getCovers(coverIds: ObjectId[]) : Promise<Cover[]> {
        try {
            const covers = await this.coverModel.find({_id : {$in: coverIds}}).exec();
            return covers;
        } catch (error) {
            console.error(error);
        }
    }

    async getCoversByUserId(userId: ObjectId[]) : Promise<Cover[]> {
        try {
            const covers = await this.coverModel.find({author_id : userId}).exec();
            return covers;
        } catch (error) {
            console.error(error);
        }

    }

    async searchCover(search: string) : Promise<Cover[]>{
        return null;
    }


    async insertCover(cover: CoverDto, author_id: ObjectId, author_username: string, book_id: ObjectId)  {
        try {
            const newCover = new this.coverModel(cover);
            await newCover.save();
            console.log('Cover created successfully');
        } catch (error) {
            console.error(error);
        }
    }

    async updateCover(id: ObjectId, cover: CoverDto) {
        try {
            const updatedCover = await this.getCoverById(id);
            if (cover.title) updatedCover.title = cover.title;
            if (cover.category) updatedCover.category = cover.category;
            if (cover.cover_url) updatedCover.cover_url = cover.cover_url;
            await updatedCover.save();
            console.log('Cover updated successfully');
        } catch (error) {
            console.error(error);
        }

    }

    async deleteCoverById(id: ObjectId) {
        try {
            await this.coverModel.findByIdAndDelete(id).exec();
            console.log('Cover deleted successfully');
        } catch (error) {
            console.error(error);
        }
    }


}
