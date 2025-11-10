import { BadRequestException, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ExchangeDto } from './dto/ExchangeDto';
import { rates } from 'src/data/rates';
import { ExchangeResult } from './dto/ExchangeResult';

@Injectable()
export class ExchangeService {
  private readonly logger = new Logger(ExchangeService.name);

  getExchangeRate(request: ExchangeDto): ExchangeResult {
    this.validateRequest(request);

    const rate = this.getRate(request);
    this.logger.log(`Exchange rate retrieved: ${rate}`);

    const exchangedValue = request.value * rate;
    this.logger.log(`Exchange calculation: ${request.value} * ${rate} = ${exchangedValue}`);

    return new ExchangeResult(exchangedValue);
  }

  private getRate(request: ExchangeDto): number {
    const rate = rates.find(r => r.from == request.from.toUpperCase() && r.to == request.to.toUpperCase());

    if (!rate) {
      throw new NotFoundException('Exchange rate not found');
    }

    return rate.rate;
  }

  private validateRequest(request: ExchangeDto) {
    if (request.value <= 0) {
      throw new BadRequestException('Value must be greater than zero');
    }
  }
}
