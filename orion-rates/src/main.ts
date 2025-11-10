import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { BadRequestException } from '@nestjs/common/exceptions/bad-request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      // eslint-disable-next-line prettier/prettier
      exceptionFactory: errors => {
        // eslint-disable-next-line prettier/prettier
        const messages = errors.flatMap(err => Object.values(err.constraints ?? {}));

        const messageString = messages.join(', ');

        return new BadRequestException({ message: messageString });
      },
    }),
  );

  await app.listen(process.env.PORT ?? 3300);
}

bootstrap();
