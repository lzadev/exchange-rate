import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExchangeQueryDto {
  @ApiProperty({ example: 'USD', description: 'Origin currency' })
  @IsString({
    message: 'sourceCurrency must be a string',
  })
  @IsNotEmpty({
    message: 'sourceCurrency must not be empty',
  })
  sourceCurrency: string;

  @ApiProperty({ example: 'EUR', description: 'Target currency' })
  @IsString({
    message: 'targetCurrency must be a string',
  })
  @IsNotEmpty({
    message: 'targetCurrency must not be empty',
  })
  targetCurrency: string;

  @ApiProperty({ example: 100, description: 'Quantity to be exchanged' })
  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: 'quantity must be a number',
    },
  )
  quantity: number;
}
