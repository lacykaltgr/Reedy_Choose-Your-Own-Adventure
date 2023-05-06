import { CacheInterceptor, CacheModule, CacheStore, CacheStoreFactory, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './users/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CoverModule } from './books/cover/cover.module';
import { ImageModule } from './books/cover/image/image.module';
import { BookModule } from './books/book/book.module';
import { BookService } from './books/book/book.service';
import { AuthorCommentsService } from './books/author_comments/author_comments.service';


@Module({
  imports: [
      ConfigModule.forRoot({
        isGlobal: true,
      }),

      MongooseModule.forRoot("mongodb+srv://laszlofreund:wzNitxdGtQjfby0C@cluster0.vnscdfb.mongodb.net/books?retryWrites=true&w=majority"),
      CacheModule.register({
          isGlobal: true,
          ttl: 1,
      }),
      AuthModule,
      CoverModule,
      ImageModule,
      BookModule,
  ],
    providers: [{
        provide: APP_INTERCEPTOR,
        useClass: CacheInterceptor
    }],
})
export class AppModule {}
