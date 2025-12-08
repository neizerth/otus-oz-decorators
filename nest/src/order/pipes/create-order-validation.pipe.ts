import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { CreateOrderDto } from '../../common/dto/create-order.dto';

/**
 * Валидация для создания заказа
 * Проверяет специфичные правила для заказов ресторана
 */
@Injectable()
export class CreateOrderValidationPipe
  implements PipeTransform<CreateOrderDto>
{
  transform(value: any, metadata: ArgumentMetadata): CreateOrderDto {
    const errors: string[] = [];

    // Проверка tableId
    if (value.tableId === undefined || value.tableId === null) {
      errors.push('Поле tableId обязательно для заполнения');
    } else if (typeof value.tableId !== 'number' || isNaN(value.tableId)) {
      errors.push('Поле tableId должно быть числом');
    } else if (value.tableId <= 0) {
      errors.push('Поле tableId должно быть положительным числом');
    }

    // Проверка menuSetId
    if (value.menuSetId === undefined || value.menuSetId === null) {
      errors.push('Поле menuSetId обязательно для заполнения');
    } else if (typeof value.menuSetId !== 'number' || isNaN(value.menuSetId)) {
      errors.push('Поле menuSetId должно быть числом');
    } else if (value.menuSetId <= 0) {
      errors.push('Поле menuSetId должно быть положительным числом');
    }

    // Проверка duration (должно быть 60, 90 или 120 минут)
    if (value.duration === undefined || value.duration === null) {
      errors.push('Поле duration обязательно для заполнения');
    } else if (typeof value.duration !== 'number' || isNaN(value.duration)) {
      errors.push('Поле duration должно быть числом');
    } else if (![60, 90, 120].includes(value.duration)) {
      errors.push('Поле duration должно быть 60, 90 или 120 минут');
    }

    // Проверка persons (минимум 1, максимум 10)
    if (value.persons === undefined || value.persons === null) {
      errors.push('Поле persons обязательно для заполнения');
    } else if (typeof value.persons !== 'number' || isNaN(value.persons)) {
      errors.push('Поле persons должно быть числом');
    } else if (value.persons < 1) {
      errors.push('Количество персон должно быть не менее 1');
    } else if (value.persons > 10) {
      errors.push('Количество персон не может превышать 10');
    }

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Ошибка валидации данных заказа',
        errors,
      });
    }

    return value as CreateOrderDto;
  }
}



