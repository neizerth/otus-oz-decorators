import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * ValidationExceptionFilter - специальный фильтр для ошибок валидации
 * Форматирует ошибки валидации в более понятном виде
 */
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const exceptionResponse = exception.getResponse();

    // Проверяем, является ли это ошибкой валидации
    const isValidationError =
      typeof exceptionResponse === 'object' &&
      'errors' in exceptionResponse &&
      Array.isArray((exceptionResponse as any).errors);

    if (isValidationError) {
      const errorResponse = {
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message: 'Ошибка валидации данных',
        errors: (exceptionResponse as any).errors,
      };

      response.status(400).json(errorResponse);
    } else {
      // Если это не ошибка валидации, используем стандартный формат
      const errorResponse = {
        statusCode: 400,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message || exception.message,
      };

      response.status(400).json(errorResponse);
    }
  }
}



