"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CoverSchema = new mongoose_1.Schema({
    title: String,
    category: String,
    description: String,
    author_name: String,
    cover_url: String,
    author_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'author',
    },
    book_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'book'
    },
    price: Number,
    publication_date: Date,
    owner_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    reader_comments_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'reader-comments'
    }
});
//# sourceMappingURL=cover.model.js.map