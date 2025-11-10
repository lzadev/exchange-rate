import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  rate: number;

  constructor(rate: number) {
    this.rate = rate;
  }
}
