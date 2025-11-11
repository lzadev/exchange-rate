import { ExchangeService } from './exchange.service';
import { ExchangeQueryDto } from './dto/excchange-query-dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(() => {
    service = new ExchangeService();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct exchanged value for valid input', () => {
    const query: ExchangeQueryDto = { from: 'USD', to: 'EUR', value: 100 };
    const result = service.getExchangeRate(query);
    expect(result).toHaveProperty('rate');
    expect(typeof result.rate).toBe('number');
    expect(result.rate).toBeGreaterThan(0);
  });

  it('should throw NotFoundException for missing rate', () => {
    const query: ExchangeQueryDto = { from: 'XXX', to: 'YYY', value: 100 };
    expect(() => service.getExchangeRate(query)).toThrow(NotFoundException);
  });

  it('should throw BadRequestException for non-positive value', () => {
    const query: ExchangeQueryDto = { from: 'USD', to: 'EUR', value: 0 };
    expect(() => service.getExchangeRate(query)).toThrow(BadRequestException);
  });
});
