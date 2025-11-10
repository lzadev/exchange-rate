import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExchangeDto {
  @ApiProperty({ example: 'USD', description: 'Origin currency' })
  @IsString({
    message: 'from must be a string',
  })
  @IsNotEmpty({
    message: 'from must not be empty',
  })
  from: string;

  @ApiProperty({ example: 'EUR', description: 'Target currency' })
  @IsString({
    message: 'to must be a string',
  })
  @IsNotEmpty({
    message: 'to must not be empty',
  })
  to: string;

  @ApiProperty({ example: 100, description: 'Amount to be exchanged' })
  @Type(() => Number)
  @IsNumber(
    {},
    {
      message: 'value must be a number',
    },
  )
  value: number;
}
