"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookSchema = void 0;
const mongoose_1 = require("mongoose");
exports.BookSchema = new mongoose_1.Schema({
    pages: [{
            page_number: Number,
            page: String,
            choices: [{
                    choice: String,
                    jump_to: Number,
                }]
        }]
});
//# sourceMappingURL=book.js.map