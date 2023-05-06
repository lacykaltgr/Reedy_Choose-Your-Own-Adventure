"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookStatsSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BookStatsSchema = new mongoose_1.Schema({
    cover_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'cover'
    },
    owner_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    opened: Number,
    open_history: [{
            timestamp: Date,
            value: Number,
        }],
    choices_made: [{
            choice_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'choice'
            },
            count: Number,
        }],
    transactions: [{
            from: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'user'
            },
            to: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'user'
            },
            amount: Number,
            timestamp: Date,
        }]
});
//# sourceMappingURL=book_stats.model.js.map