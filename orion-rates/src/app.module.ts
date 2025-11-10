import { Module } from '@nestjs/common';
import { ExchangeModule } from './modules/exchange/exchange.module';
import { ConfigModule } from '@nestjs/config/dist/config.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ExchangeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
