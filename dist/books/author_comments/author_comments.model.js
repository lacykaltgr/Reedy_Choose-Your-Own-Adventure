"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthorCommentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.AuthorCommentSchema = new mongoose_1.Schema({
    book_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'book'
    },
    notes: String,
    comments: [{
            page_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'page'
            },
            comment: String,
        }]
});
//# sourceMappingURL=author_comments.model.js.map