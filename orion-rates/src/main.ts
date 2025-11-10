import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';
import { GlobalExceptionFilter } from 'common/filters/global-exception-filter';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Orion Rates API')
    .setDescription('API for fetching exchange rates')
    .setVersion('1.0')
    .addSecurity('x-api-key', { type: 'apiKey', name: 'x-api-key', in: 'header' })
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: { persistAuthorization: true },
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      exceptionFactory: errors => {
        const messages = errors.flatMap(err => Object.values(err.constraints ?? {}));

        const messageString = messages.join(', ');

        return new BadRequestException({ message: messageString });
      },
    }),
  );

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
