import { Module } from '@nestjs/common';
import { ExchangeModule } from './modules/exchange/exchange.module';

@Module({
  imports: [ExchangeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
