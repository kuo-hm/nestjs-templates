import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeRateService {
  async getExchangeRate(from: string, to: string): Promise<number> {
    return 1;
  }
}

