import { ObjectId } from 'mongoose';
import { PageService } from './page.service';
export declare class PageController {
    private readonly pageService;
    constructor(pageService: PageService);
    getPage(pageId: ObjectId): Promise<import("./page.model").Page>;
}
