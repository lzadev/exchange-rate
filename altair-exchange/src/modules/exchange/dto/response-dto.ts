import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto {
  @ApiProperty()
  statusCode: number;
  @ApiProperty()
  data?: ExchangeData | null;
  @ApiProperty()
  message: string;

  constructor(statusCode: number, message: string, data?: ExchangeData | null) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data || null;
  }
}

export class ExchangeData {
  @ApiProperty()
  total: number;

  constructor(total: number) {
    this.total = total;
  }
}
