"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextGeneratorController = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const image_configuration_1 = require("../../cover/image/image.configuration");
let TextGeneratorController = class TextGeneratorController {
    async generatePage(prompt) {
        const openai = new openai_1.OpenAIApi(image_configuration_1.apiConfiguration);
        const response = await openai.createCompletion({
            prompt: prompt,
            model: "davinci",
            temperature: 0.5,
        });
        return response.data[0];
    }
    async generateIdea(prompt) {
        const openai = new openai_1.OpenAIApi(image_configuration_1.apiConfiguration);
        const response = await openai.createCompletion({
            prompt: prompt,
            model: "davinci",
            temperature: 0.5,
        });
        return response.data[0];
    }
};
__decorate([
    (0, common_1.Post)('page'),
    __param(0, (0, common_1.Body)('prompt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TextGeneratorController.prototype, "generatePage", null);
__decorate([
    (0, common_1.Post)('idea'),
    __param(0, (0, common_1.Body)('prompt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TextGeneratorController.prototype, "generateIdea", null);
TextGeneratorController = __decorate([
    (0, common_1.Controller)('generate')
], TextGeneratorController);
exports.TextGeneratorController = TextGeneratorController;
//# sourceMappingURL=text_generation.controller.js.map