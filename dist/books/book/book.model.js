"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const mongoose_1 = require("mongoose");
const page_model_1 = require("./page/page.model");
exports.BookSchema = new mongoose_1.Schema({
    title: String,
    author_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user'
    },
    pages: [page_model_1.PageSchema],
});
//# sourceMappingURL=book.model.js.map