"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PageSchema = new mongoose_1.Schema({
    cover: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'cover'
    },
    page: String,
    choices: [
        {
            choice: String,
            jump_to: mongoose_1.Schema.Types.ObjectId,
        }
    ]
});
//# sourceMappingURL=book.model.js.map