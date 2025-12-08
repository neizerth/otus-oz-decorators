import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';

/**
 * AllExceptionsFilter - обрабатывает все исключения, включая необработанные
 * Используется как fallback для непредвиденных ошибок
 */
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    // Если это HTTP исключение, обрабатываем стандартно
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      const errorResponse = {
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        message:
          typeof exceptionResponse === 'string'
            ? exceptionResponse
            : (exceptionResponse as any).message || exception.message,
      };

      return response.status(status).json(errorResponse);
    }

    // Для необработанных ошибок возвращаем 500
    const errorResponse = {
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      path: request.url,
      method: request.method,
      message: 'Внутренняя ошибка сервера',
      ...(process.env.NODE_ENV === 'development' && {
        error: exception instanceof Error ? exception.message : String(exception),
        stack: exception instanceof Error ? exception.stack : undefined,
      }),
    };

    response.status(HttpStatus.INTERNAL_SERVER_ERROR).json(errorResponse);
  }
}

