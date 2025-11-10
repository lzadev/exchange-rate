import { Controller, Get } from '@nestjs/common';
import { ExchangeService } from './exchange.service';

@Controller('exchanges')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  getRate(): string {
    return this.exchangeService.getRate();
  }
}
