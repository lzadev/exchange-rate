import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ResponseDto } from 'src/modules/exchange/dto/response-dto';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error(exception);

    if (exception instanceof HttpException) {
      const exResponse = exception.getResponse() as { message: string };
      const bodyResponse = new ResponseDto(exception.getStatus(), exResponse.message, null);
      response.status(exception.getStatus()).json(bodyResponse);
      return;
    }

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(
        new ResponseDto(
          HttpStatus.INTERNAL_SERVER_ERROR,
          'Internal server error, please try again later',
          null,
        ),
      );
  }
}
