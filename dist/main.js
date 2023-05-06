"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session = require("express-session");
const passport = require("passport");
const aws_sdk_1 = require("aws-sdk");
const config_1 = require("@nestjs/config");
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use(session({
        secret: "a titok",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 1000 * 60 * 60 },
        store: MongoStore.create({
            mongoUrl: "mongodb+srv://laszlofreund:wzNitxdGtQjfby0C@cluster0.vnscdfb.mongodb.net/session?retryWrites=true&w=majority",
        }),
    }));
    const configService = app.get(config_1.ConfigService);
    aws_sdk_1.config.update({
        accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
        region: configService.get('AWS_REGION'),
    });
    app.use(passport.initialize());
    app.use(passport.session());
    app.enableCors();
    await app.listen(3000);
}
bootstrap();
//# sourceMappingURL=main.js.map