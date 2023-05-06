"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose_1 = require("mongoose");
exports.UserSchema = new mongoose_1.Schema({
    username: String,
    email: String,
    password: String,
    language: String,
    stats_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'user_stats'
    },
    stripeCustomerId: String,
    readerSubscription: Boolean,
    writerSubscription: Boolean,
});
//# sourceMappingURL=user.model.js.map