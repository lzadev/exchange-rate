import { Injectable, NotFoundException } from '@nestjs/common';
import { ExchangeDto } from './dto/ExchangeDto';
import { rates } from 'src/data/rates';
import { ExchangeResult } from './dto/ExchangeResult';

@Injectable()
export class ExchangeService {
  getExchangeRate(request: ExchangeDto): ExchangeResult {
    this.validateRequest(request);

    const rate = this.getRate(request);

    const exchangedValue = request.value * rate;

    return new ExchangeResult(exchangedValue);
  }

  getRate(request: ExchangeDto): number {
    const rate = rates.find(r => r.from == request.from && r.to == request.to);

    if (!rate) {
      throw new NotFoundException({ message: 'Exchange rate not found' });
    }

    return rate.rate;
  }

  validateRequest(request: ExchangeDto) {
    if (request.value <= 0) {
      throw new Error('Value must be greater than zero');
    }
  }
}
