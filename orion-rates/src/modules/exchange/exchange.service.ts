import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeService {
  getRate(): string {
    return 'Exchange Service';
  }
}
