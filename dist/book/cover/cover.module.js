"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoverModule = void 0;
const common_1 = require("@nestjs/common");
const cover_service_1 = require("./cover.service");
const mongoose_1 = require("@nestjs/mongoose");
const page_model_1 = require("../page/page.model");
const cover_1 = require("./cover");
const cover_controller_1 = require("./cover.controller");
const image_service_1 = require("./cover.image/image.service");
let CoverModule = class CoverModule {
};
CoverModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'page', schema: page_model_1.PageSchema }, { name: 'cover', schema: cover_1.CoverSchema }])],
        providers: [cover_service_1.CoverService, image_service_1.CoverImageService],
        controllers: [cover_controller_1.CoverController]
    })
], CoverModule);
exports.CoverModule = CoverModule;
//# sourceMappingURL=cover.module.js.map