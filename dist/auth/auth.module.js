"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const user_module_1 = require("../users/user.module");
const passport_1 = require("@nestjs/passport");
const local_strategy_1 = require("./utils/local.strategy");
const user_service_1 = require("../users/user.service");
const mongoose_1 = require("@nestjs/mongoose");
const user_model_1 = require("../users/user.model");
const auth_controller_1 = require("./auth.controller");
const session_serializer_1 = require("./utils/session_serializer");
let AuthModule = class AuthModule {
};
AuthModule = __decorate([
    (0, common_1.Module)({
        imports: [
            user_module_1.UserModule,
            passport_1.PassportModule.register({
                session: true
            }),
            mongoose_1.MongooseModule.forFeature([
                { name: "Users", schema: user_model_1.UserSchema }
            ])
        ],
        providers: [
            auth_service_1.AuthService,
            local_strategy_1.LocalStrategy,
            session_serializer_1.SessionSerializer,
            user_service_1.UserService,
        ],
        controllers: [auth_controller_1.AuthController]
    })
], AuthModule);
exports.AuthModule = AuthModule;
//# sourceMappingURL=auth.module.js.map