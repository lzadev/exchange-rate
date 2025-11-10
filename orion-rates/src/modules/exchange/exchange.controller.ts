import { Controller, Get, Query } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeDto } from './dto/ExchangeDto';
import { ExchangeResult } from './dto/ExchangeResult';

@Controller('exchanges')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  getRate(@Query() query: ExchangeDto): ExchangeResult {
    return this.exchangeService.getExchangeRate(query);
  }
}
