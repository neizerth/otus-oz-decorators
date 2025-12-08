import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

/**
 * RateLimitGuard - простой rate limiting для защиты от спама
 * Ограничивает количество запросов с одного IP за период времени
 */
@Injectable()
export class RateLimitGuard implements CanActivate {
  private requests = new Map<string, { count: number; resetTime: number }>();
  private readonly maxRequests = 10; // Максимум запросов
  private readonly windowMs = 60000; // Окно времени в миллисекундах (1 минута)

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip || request.connection.remoteAddress || 'unknown';
    const now = Date.now();

    const record = this.requests.get(ip);

    if (!record || now > record.resetTime) {
      // Создаем новую запись или сбрасываем счетчик
      this.requests.set(ip, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return true;
    }

    if (record.count >= this.maxRequests) {
      throw new HttpException(
        `Слишком много запросов. Попробуйте через ${Math.ceil((record.resetTime - now) / 1000)} секунд`,
        HttpStatus.TOO_MANY_REQUESTS,
      );
    }

    record.count++;
    return true;
  }
}

