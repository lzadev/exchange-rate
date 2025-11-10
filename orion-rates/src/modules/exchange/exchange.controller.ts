import { Body, Controller, Post } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeDto } from './dto/ExchangeDto';

@Controller('exchanges')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  getRate(@Body() body: ExchangeDto): string {
    return this.exchangeService.getRate(body);
  }
}
