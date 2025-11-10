import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';

export class ErrorResponseDto {
  @ApiProperty()
  message: string;
}
