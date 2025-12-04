import { Injectable } from '@nestjs/common';

@Injectable()
export class OcrService {
  async extractTextFromImage(imageBuffer: Buffer): Promise<string> {
    return '';
  }
}

