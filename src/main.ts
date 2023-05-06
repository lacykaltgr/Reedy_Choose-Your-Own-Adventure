import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from "express-session";
import * as passport from "passport";
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

//csak ilyen importtal működik
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');


async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.use(
    session({
    secret: "a titok",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000*60*60},
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://laszlofreund:wzNitxdGtQjfby0C@cluster0.vnscdfb.mongodb.net/session?retryWrites=true&w=majority",
    }),
    //secure: true  - https kell hozzá
    })
  );

  //aws s3
  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get('AWS_ACCESS_KEY_ID'),
    secretAccessKey: configService.get('AWS_SECRET_ACCESS_KEY'),
    region: configService.get('AWS_REGION'),
  });


  app.use(passport.initialize());
  app.use(passport.session());

  //app.use(cookieParser('a titok'));
  app.enableCors();

  await app.listen(3000);
}

bootstrap();
