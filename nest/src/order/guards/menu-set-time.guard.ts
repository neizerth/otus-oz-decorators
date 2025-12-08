import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { MenuSetService } from '../../menu-set/menu-set.service';

/**
 * MenuSetTimeGuard - проверяет, что menuSet доступен в текущее время
 * Заказы можно создавать только если текущее время в диапазоне startTime - endTime
 */
@Injectable()
export class MenuSetTimeGuard implements CanActivate {
  constructor(private menuSetService: MenuSetService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (!body.menuSetId) {
      return true; // Если menuSetId не передан, пропускаем (валидация будет в pipe)
    }

    const menuSet = await this.menuSetService.findOne(body.menuSetId);
    if (!menuSet) {
      throw new ForbiddenException('Набор меню не найден');
    }

    const now = new Date();
    const startTime = new Date(menuSet.startTime);
    const endTime = new Date(menuSet.endTime);

    if (now < startTime || now > endTime) {
      throw new ForbiddenException(
        `Набор меню "${menuSet.name}" недоступен в текущее время. ` +
          `Доступен с ${startTime.toLocaleTimeString()} до ${endTime.toLocaleTimeString()}`,
      );
    }

    return true;
  }
}



