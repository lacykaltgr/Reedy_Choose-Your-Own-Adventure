"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageSchema = void 0;
const mongoose_1 = require("mongoose");
exports.PageSchema = new mongoose_1.Schema({
    page: String,
    choices: [
        {
            choice: String,
            jump_to: mongoose_1.Schema.Types.ObjectId,
        }
    ]
});
//# sourceMappingURL=page.js.map