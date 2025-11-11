import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from './exchange.service';
import { ExchangeQueryDto } from './dto/exchange-query-dto';
import { NotFoundException, BadRequestException } from '@nestjs/common';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return correct exchange value for valid input', () => {
    const query: ExchangeQueryDto = {
      sourceCurrency: 'USD',
      targetCurrency: 'EUR',
      quantity: 100,
    };
    const result = service.getExchangeRate(query);
    expect(result.statusCode).toBe(200);
    expect(result.data?.total).toBeCloseTo(92); // 100 * 0.92
    expect(result.message).toBe('Success');
  });

  it('should throw BadRequestException for quantity <= 0', () => {
    const query: ExchangeQueryDto = {
      sourceCurrency: 'USD',
      targetCurrency: 'EUR',
      quantity: 0,
    };
    expect(() => service.getExchangeRate(query)).toThrow(BadRequestException);
  });

  it('should throw NotFoundException for missing rate', () => {
    const query: ExchangeQueryDto = {
      sourceCurrency: 'XXX',
      targetCurrency: 'YYY',
      quantity: 100,
    };
    expect(() => service.getExchangeRate(query)).toThrow(NotFoundException);
  });

  it('should be case-insensitive for currency codes', () => {
    const query: ExchangeQueryDto = {
      sourceCurrency: 'usd',
      targetCurrency: 'eur',
      quantity: 100,
    };
    const result = service.getExchangeRate(query);
    expect(result.data?.total).toBeCloseTo(92);
  });

  it('should handle decimal quantities', () => {
    const query: ExchangeQueryDto = {
      sourceCurrency: 'USD',
      targetCurrency: 'EUR',
      quantity: 12.5,
    };
    const result = service.getExchangeRate(query);
    expect(result.data?.total).toBeCloseTo(11.5);
  });
});
