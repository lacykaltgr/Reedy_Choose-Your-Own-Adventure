"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cover = void 0;
const mongoose = require("mongoose");
exports.Cover = new mongoose.Schema({
    title: String,
    category: String,
    cover_url: String,
    author_id: String,
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book',
    },
});
//# sourceMappingURL=cover.model.js.map