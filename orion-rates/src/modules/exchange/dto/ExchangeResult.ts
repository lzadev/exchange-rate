import { ApiProperty } from '@nestjs/swagger';

export class ExchangeResult {
  @ApiProperty()
  rate: number;

  constructor(rate: number) {
    this.rate = rate;
  }
}
