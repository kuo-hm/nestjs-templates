import { Injectable } from '@nestjs/common';

@Injectable()
export class MarketDataService {
  async getMarketData(symbol: string) {
    return {};
  }
}

