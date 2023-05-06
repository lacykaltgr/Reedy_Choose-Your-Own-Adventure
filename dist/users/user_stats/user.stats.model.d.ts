/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { ObjectId, Schema, Document } from 'mongoose';
export declare const UserStatsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    choices_made: {
        choices: import("mongoose").Types.ObjectId[];
        book_id?: import("mongoose").Types.ObjectId;
        finished?: boolean;
    }[];
    ratings: {
        rating?: number;
        cover_id?: import("mongoose").Types.ObjectId;
    }[];
    list: import("mongoose").Types.ObjectId[];
    books: import("mongoose").Types.ObjectId[];
    covers: import("mongoose").Types.ObjectId[];
}>;
export interface UserStats extends Document {
    choices_made: [
        {
            book_id: ObjectId;
            finished: boolean;
            choices: ObjectId[];
        }
    ];
    ratings: [
        {
            cover_id: ObjectId;
            rating: number;
        }
    ];
    list: ObjectId[];
    books: ObjectId[];
    covers: ObjectId[];
}
