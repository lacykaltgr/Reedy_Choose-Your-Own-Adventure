import { Model, ObjectId } from "mongoose";
import { Page } from "./page";
export declare class PageService {
    private readonly pageModel;
    constructor(pageModel: Model<Page>);
    getPageById(id: ObjectId): Promise<Page>;
}
