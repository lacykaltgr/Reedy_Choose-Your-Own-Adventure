"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const image_configuration_1 = require("./image.configuration");
const joi_1 = require("joi");
let ImageService = class ImageService {
    async getGeneratedImage(text) {
        const openai = new openai_1.OpenAIApi(image_configuration_1.apiConfiguration);
        const response = await openai.createImage({
            prompt: "book cover of " + (0, joi_1.string)(),
            n: 1,
            size: '1024x1024'
        });
        const image_url = response.data[0].url;
        return image_url;
    }
};
ImageService = __decorate([
    (0, common_1.Injectable)()
], ImageService);
exports.ImageService = ImageService;
//# sourceMappingURL=image.service.js.map