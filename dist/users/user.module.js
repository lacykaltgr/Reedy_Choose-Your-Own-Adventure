"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("./user.model");
const user_controller_1 = require("./user.controller");
const user_stats_model_1 = require("./user_stats/user.stats.model");
const book_model_1 = require("../books/book/book.model");
const auth_service_1 = require("./auth/auth.service");
const user_stats_service_1 = require("./user_stats/user.stats.service");
let UserModule = class UserModule {
};
UserModule = __decorate([
    (0, common_1.Module)({
        imports: [mongoose_1.MongooseModule.forFeature([
                { name: "user", schema: user_model_1.UserSchema },
                { name: "user_stats", schema: user_stats_model_1.UserStatsSchema },
                { name: "book", schema: book_model_1.BookSchema }
            ])],
        providers: [user_service_1.UserService, auth_service_1.AuthService, user_stats_service_1.UserStatsService],
        controllers: [user_controller_1.UserController]
    })
], UserModule);
exports.UserModule = UserModule;
//# sourceMappingURL=user.module.js.map