import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeDto } from './dto/ExchangeDto';
import { ExchangeResult } from './dto/ExchangeResult';
import { ApiKeyGuard } from 'common/guards/api-key.guard';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ErrorResponseDto } from 'common/dto/error-response';

@ApiSecurity('x-api-key')
@Controller('exchanges')
@UseGuards(ApiKeyGuard)
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}
  @Get()
  @ApiOkResponse({
    description: 'Successful exchange rate converted',
    type: ExchangeResult,
  })
  @ApiBadRequestResponse({
    description: 'Ivalid input data',
    type: ErrorResponseDto,
  })
  @ApiNotFoundResponse({
    description: 'Exchange rate not found for the given currency pair',
  })
  @ApiUnauthorizedResponse({
    description: 'API key is missing or invalid',
    type: ErrorResponseDto,
  })
  @ApiForbiddenResponse({
    description: 'Access denied due to invalid API key',
    type: ErrorResponseDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error, something went wrong',
    type: ErrorResponseDto,
  })
  getRate(@Query() query: ExchangeDto): ExchangeResult {
    return this.exchangeService.getExchangeRate(query);
  }
}
