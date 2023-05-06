import { Configuration } from 'openai';

export const apiConfiguration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});