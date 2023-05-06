"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./users/auth/auth.module");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const cover_module_1 = require("./books/cover/cover.module");
const image_module_1 = require("./books/cover/image/image.module");
const book_module_1 = require("./books/book/book.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            mongoose_1.MongooseModule.forRoot("mongodb+srv://laszlofreund:wzNitxdGtQjfby0C@cluster0.vnscdfb.mongodb.net/books?retryWrites=true&w=majority"),
            common_1.CacheModule.register({
                isGlobal: true,
                ttl: 1,
            }),
            auth_module_1.AuthModule,
            cover_module_1.CoverModule,
            image_module_1.ImageModule,
            book_module_1.BookModule,
        ],
        providers: [{
                provide: core_1.APP_INTERCEPTOR,
                useClass: common_1.CacheInterceptor
            }],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map