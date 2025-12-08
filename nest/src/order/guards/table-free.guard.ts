import {
  CanActivate,
  ExecutionContext,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Table } from '../../entities';

/**
 * TableFreeGuard - проверяет, что столик свободен перед созданием нового заказа
 * Нельзя создать новый заказ, если у столика уже есть активный заказ
 */
@Injectable()
export class TableFreeGuard implements CanActivate {
  constructor(
    @InjectRepository(Table)
    private tableRepo: Repository<Table>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const body = request.body;

    if (!body.tableId) {
      return true; // Если tableId не передан, пропускаем (валидация будет в pipe)
    }

    const table = await this.tableRepo.findOne({
      where: { id: body.tableId },
    });

    if (!table) {
      return true; // Столик не найден - это проверит сервис
    }

    if (table.activeOrderId) {
      throw new ConflictException(
        `Столик #${table.number} уже имеет активный заказ. Сначала завершите текущий заказ.`,
      );
    }

    return true;
  }
}
