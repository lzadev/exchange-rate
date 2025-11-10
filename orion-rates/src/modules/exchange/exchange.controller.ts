import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeDto } from './dto/ExchangeDto';
import { ExchangeResult } from './dto/ExchangeResult';
import { ApiKeyGuard } from 'common/guards/api-key.guard';

@Controller('exchanges')
@UseGuards(ApiKeyGuard)
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Get()
  getRate(@Query() query: ExchangeDto): ExchangeResult {
    return this.exchangeService.getExchangeRate(query);
  }
}
