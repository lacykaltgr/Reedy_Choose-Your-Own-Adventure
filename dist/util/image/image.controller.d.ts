import { ImageService } from './image.service';
export declare class ImageController {
    private readonly imageService;
    constructor(imageService: ImageService);
    generatedImage(prompt: string): Promise<any>;
}
