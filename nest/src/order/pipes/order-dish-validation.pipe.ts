import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { OrderDishDto } from '../../common/dto/order-dish.dto';

/**
 * Валидация для заказа блюда
 * Проверяет dishId
 */
@Injectable()
export class OrderDishValidationPipe implements PipeTransform<OrderDishDto> {
  transform(value: any, metadata: ArgumentMetadata): OrderDishDto {
    const errors: string[] = [];

    // Проверка dishId
    if (value.dishId === undefined || value.dishId === null) {
      errors.push('Поле dishId обязательно для заполнения');
    } else if (typeof value.dishId !== 'number' || isNaN(value.dishId)) {
      errors.push('Поле dishId должно быть числом');
    } else if (value.dishId <= 0) {
      errors.push('Поле dishId должно быть положительным числом');
    }

    if (errors.length > 0) {
      throw new BadRequestException({
        message: 'Ошибка валидации данных заказа блюда',
        errors,
      });
    }

    return value as OrderDishDto;
  }
}



