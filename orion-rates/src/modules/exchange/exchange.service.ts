import { Injectable } from '@nestjs/common';
import { ExchangeDto } from './dto/ExchangeDto';

@Injectable()
export class ExchangeService {
  getRate(request: ExchangeDto) {
    return 'Exchange Service';
  }
}
