"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadModule = void 0;
const common_1 = require("@nestjs/common");
const read_controller_1 = require("./read.controller");
const page_service_1 = require("../page/page.service");
const cover_service_1 = require("../cover/cover.service");
const mongoose_1 = require("@nestjs/mongoose");
const page_1 = require("../page/page");
const cover_1 = require("../cover/cover");
let ReadModule = class ReadModule {
};
ReadModule = __decorate([
    (0, common_1.Module)({
        imports: [common_1.CacheModule.register(),
            mongoose_1.MongooseModule.forFeature([{ name: 'cover', schema: cover_1.CoverSchema },
                { name: 'page', schema: page_1.PageSchema }]),
        ],
        controllers: [read_controller_1.ReadController],
        providers: [page_service_1.PageService, cover_service_1.CoverService]
    })
], ReadModule);
exports.ReadModule = ReadModule;
//# sourceMappingURL=read.module.js.map