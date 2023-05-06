import { Controller, Get, Post } from '@nestjs/common';

@Controller('cover/image')
export class BookController {

  @Get('generate')
  async generateCoverImage() {

  }

  @Post('save')
  async saveCoverImage() {

  }
}