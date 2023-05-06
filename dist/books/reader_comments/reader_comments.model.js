"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReaderCommentSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ReaderCommentSchema = new mongoose_1.Schema({
    comments: [{
            user_id: {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: 'page'
            },
            username: String,
            comment: String,
            timestamp: Date,
        }]
});
//# sourceMappingURL=reader_comments.model.js.map