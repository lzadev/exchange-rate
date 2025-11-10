import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ExchangeQueryDto } from './dto/excchange-query-dto';
import { rates } from 'src/data/rates';
import { ResponseDto } from './dto/response-dto';

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger(ExchangeService.name);

  getExchangeRate(query: ExchangeQueryDto): ResponseDto {
    this.validateRequest(query);

    const rate = this.getRate(query);
    this.logger.log(`Exchange rate retrieved: ${rate}`);

    const exchangedValue = query.value * rate;
    this.logger.log(`Exchange calculation: ${query.value} * ${rate} = ${exchangedValue}`);

    return new ResponseDto(exchangedValue);
  }

  private getRate(query: ExchangeQueryDto): number {
    const rate = rates.find(r => r.from == query.from.toUpperCase() && r.to == query.to.toUpperCase());

    if (!rate) {
      throw new NotFoundException('Exchange rate not found');
    }

    return rate.rate;
  }

  private validateRequest(query: ExchangeQueryDto) {
    if (query.value <= 0) {
      throw new BadRequestException('Value must be greater than zero');
    }
  }
}
