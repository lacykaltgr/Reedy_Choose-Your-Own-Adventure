"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserStatsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserStatsSchema = new mongoose_1.Schema({
    choices_made: [{
            book_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'book'
            },
            finished: Boolean,
            choices: [{
                    type: mongoose_1.Schema.Types.ObjectId,
                    ref: 'choice',
                }]
        }],
    ratings: [{
            cover_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'cover',
            },
            rating: Number,
        }],
    list: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'cover',
        }],
    books: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'book',
        }],
    covers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'cover'
        }]
});
//# sourceMappingURL=user.stats.model.js.map