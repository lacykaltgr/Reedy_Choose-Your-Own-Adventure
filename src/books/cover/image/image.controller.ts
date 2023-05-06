import { Body, Controller, Get } from '@nestjs/common';
import { ImageService } from './image.service';

@Controller('image')
export class ImageController {

  constructor(private readonly imageService: ImageService){}


  @Get('generate')
  generatedImage(@Body('prompt') prompt: string) {
    return this.imageService.getGeneratedImage(prompt);
  }
}
