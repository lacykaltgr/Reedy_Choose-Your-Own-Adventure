import { Controller, Post, Body } from '@nestjs/common';
import { OpenAIApi } from 'openai';
import { apiConfiguration } from '../../cover/image/image.configuration';
import { string } from 'joi';

@Controller('generate')
export class TextGeneratorController {
  @Post('page')
  async generatePage(@Body('prompt') prompt: string): Promise<string> {
    const openai = new OpenAIApi(apiConfiguration);
    const response = await openai.createCompletion(
      {
        prompt: prompt,
        model: "davinci",
        temperature: 0.5,
      }
    )
    return response.data[0];
  }


  @Post('idea')
  async generateIdea(@Body('prompt') prompt: string): Promise<string> {
    const openai = new OpenAIApi(apiConfiguration);
    const response = await openai.createCompletion(
      {
        prompt: prompt,
        model: "davinci",
        temperature: 0.5,
      }
    )
    return response.data[0];
  }
}