import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class ExchangeDto {
  @IsString({
    message: 'from must be a string',
  })
  @IsNotEmpty({
    message: 'from must not be empty',
  })
  from: string;

  @IsString({
    message: 'to must be a string',
  })
  @IsNotEmpty({
    message: 'to must not be empty',
  })
  to: string;

  @IsNumber(
    {},
    {
      message: 'value must be a number',
    },
  )
  value: number;
}
