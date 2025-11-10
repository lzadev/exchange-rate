import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ExchangeQueryDto } from './dto/exchange-query-dto';
import { rates } from 'src/data/rates';
import { ExchangeData, ResponseDto } from './dto/response-dto';

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger(ExchangeService.name);

  getExchangeRate(query: ExchangeQueryDto): ResponseDto {
    this.validateRequest(query);

    const rate = this.getRate(query);
    this.logger.log(`Exchange rate retrieved: ${rate}`);

    const exchangedValue = query.quantity * rate;
    this.logger.log(`Exchange calculation: ${query.quantity} * ${rate} = ${exchangedValue}`);

    const data = new ExchangeData(exchangedValue);
    return new ResponseDto(200, 'Success', data);
  }

  private getRate(query: ExchangeQueryDto): number {
    const rate = rates.find(
      r => r.from == query.sourceCurrency.toUpperCase() && r.to == query.targetCurrency.toUpperCase(),
    );

    if (!rate) {
      throw new NotFoundException('Exchange rate not found');
    }

    return rate.rate;
  }

  private validateRequest(query: ExchangeQueryDto) {
    if (query.quantity <= 0) {
      throw new BadRequestException('Quantity must be greater than zero');
    }
  }
}
