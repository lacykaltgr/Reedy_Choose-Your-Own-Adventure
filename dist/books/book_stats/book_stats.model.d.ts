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
export declare const BookStatsSchema: Schema<any, import("mongoose").Model<any, any, any, any, any>, {}, {}, {}, {}, "type", {
    choices_made: {
        count?: number;
        choice_id?: import("mongoose").Types.ObjectId;
    }[];
    open_history: {
        timestamp?: Date;
        value?: number;
    }[];
    transactions: {
        from?: import("mongoose").Types.ObjectId;
        timestamp?: Date;
        amount?: number;
        to?: import("mongoose").Types.ObjectId;
    }[];
    owner_id?: import("mongoose").Types.ObjectId;
    cover_id?: import("mongoose").Types.ObjectId;
    opened?: number;
}>;
export interface BookStats extends Document {
    cover_id: ObjectId;
    owner_id: ObjectId;
    opened: number;
    open_history: [
        {
            timestamp: Date;
            value: number;
        }
    ];
    choices_made: [
        {
            choice_id: ObjectId;
            count: number;
        }
    ];
    transactions: [
        {
            from: ObjectId;
            to: ObjectId;
            amount: number;
            timestamp: Date;
        }
    ];
}
