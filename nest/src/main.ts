import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173',
    credentials: true,
  });

  // Применяем глобальные Exception Filters
  app.useGlobalFilters(
    new ValidationExceptionFilter(), // Сначала обрабатываем ошибки валидации
    new AllExceptionsFilter(), // Затем все остальные исключения
  );

  await app.listen(3000);
}
bootstrap();
