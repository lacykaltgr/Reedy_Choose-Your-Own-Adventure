/// <reference types="node" />
import { ConfigService } from '@nestjs/config';
export declare class CoverImageService {
    private readonly configService;
    constructor(configService: ConfigService);
    uploadCoverImage(dataBuffer: Buffer, filename: string): Promise<string>;
}
