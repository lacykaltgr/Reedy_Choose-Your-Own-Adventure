"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverSchema = void 0;
const mongoose_1 = require("mongoose");
exports.CoverSchema = new mongoose_1.Schema({
    title: String,
    category: String,
    cover_url: String,
    author_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'author',
    },
    firstpage: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'page',
    },
});
//# sourceMappingURL=cover.js.map