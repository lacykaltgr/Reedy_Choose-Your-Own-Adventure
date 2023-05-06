import { Injectable } from '@nestjs/common';
import { OpenAIApi } from "openai";
import { apiConfiguration } from './image.configuration';
import { string } from 'joi';

@Injectable()
export class ImageService {

  async getGeneratedImage(text: string) {
    const openai = new OpenAIApi(apiConfiguration);
    const response = await openai.createImage(
      {
        prompt: "book cover of " + string(),
        n: 1,
        size: '1024x1024'
      }
    )
    const image_url = response.data[0].url;
    return image_url;
  }

}
