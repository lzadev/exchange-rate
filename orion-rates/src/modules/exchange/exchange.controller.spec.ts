import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeController } from './exchange.controller';
import { ExchangeService } from './exchange.service';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { ConfigModule } from '@nestjs/config';

describe('ExchangeController', () => {
  let controller: ExchangeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      controllers: [ExchangeController],
      providers: [ExchangeService, ApiKeyGuard],
    }).compile();

    controller = module.get<ExchangeController>(ExchangeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getRate', () => {
    it('should return exchange rate for valid query', () => {
      const service = { getExchangeRate: jest.fn().mockReturnValue({ rate: 42 }) };
      const controller = new ExchangeController(service as any);
      const query = { from: 'USD', to: 'EUR', value: 100 };
      const result = controller.getRate(query);
      expect(result).toEqual({ rate: 42 });
      expect(service.getExchangeRate).toHaveBeenCalledWith(query);
    });

    it('should throw NotFoundException for missing rate', () => {
      const service = {
        getExchangeRate: jest.fn(() => {
          throw { name: 'NotFoundException' };
        }),
      };
      const controller = new ExchangeController(service as any);
      const query = { from: 'XXX', to: 'YYY', value: 100 };
      expect(() => controller.getRate(query)).toThrow();
    });

    it('should throw BadRequestException for invalid value', () => {
      const service = {
        getExchangeRate: jest.fn(() => {
          throw { name: 'BadRequestException' };
        }),
      };
      const controller = new ExchangeController(service as any);
      const query = { from: 'USD', to: 'EUR', value: 0 };
      expect(() => controller.getRate(query)).toThrow();
    });
  });
});
