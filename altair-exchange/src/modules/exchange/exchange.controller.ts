import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeQueryDto } from './dto/exchange-query-dto';
import { ResponseDto } from './dto/response-dto';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

@ApiSecurity('x-api-key')
@Controller('exchanges')
@UseGuards(ApiKeyGuard)
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}
  @Get()
  @ApiOkResponse({
    description: 'Successful exchange rate converted',
    type: ExchangeQueryDto,
  })
  @ApiBadRequestResponse({
    description: 'Ivalid input data',
    type: ResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Exchange rate not found for the given currency pair',
  })
  @ApiUnauthorizedResponse({
    description: 'API key is missing or invalid',
    type: ResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'Access denied due to invalid API key',
    type: ResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error, something went wrong',
    type: ResponseDto,
  })
  getRate(@Query() query: ExchangeQueryDto): ResponseDto {
    return this.exchangeService.getExchangeRate(query);
  }
}
