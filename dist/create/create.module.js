"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateModule = void 0;
const common_1 = require("@nestjs/common");
const page_service_1 = require("../page/page.service");
const cover_service_1 = require("../cover/cover.service");
const read_controller_1 = require("../read/read.controller");
const create_controller_1 = require("./create.controller");
const mongoose_1 = require("@nestjs/mongoose");
const page_1 = require("../page/page");
const cover_1 = require("../cover/cover");
let CreateModule = class CreateModule {
};
CreateModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([{ name: 'page', schema: page_1.PageSchema }, { name: 'cover', schema: cover_1.CoverSchema }]),],
        providers: [page_service_1.PageService, cover_service_1.CoverService],
        controllers: [read_controller_1.ReadController, create_controller_1.CreateController]
    })
], CreateModule);
exports.CreateModule = CreateModule;
//# sourceMappingURL=create.module.js.map