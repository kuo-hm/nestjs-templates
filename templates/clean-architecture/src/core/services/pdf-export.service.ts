import { Injectable } from '@nestjs/common';

@Injectable()
export class PdfExportService {
  async exportToPdf(data: any, filename: string): Promise<Buffer> {
    return Buffer.from('');
  }
}

