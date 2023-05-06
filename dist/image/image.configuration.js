"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apiConfiguration = void 0;
const openai_1 = require("openai");
exports.apiConfiguration = new openai_1.Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
//# sourceMappingURL=image.configuration.js.map