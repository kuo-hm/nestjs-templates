import { Injectable } from '@nestjs/common';

@Injectable()
export class ExcelExportService {
  async exportToExcel(data: any[], filename: string): Promise<Buffer> {
    return Buffer.from('');
  }
}

