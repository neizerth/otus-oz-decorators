import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

/**
 * Валидация номера столика из параметров URL
 */
@Injectable()
export class TableNumberValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): number {
    if (value === undefined || value === null) {
      throw new BadRequestException('Номер столика обязателен');
    }

    const tableNumber = Number(value);
    if (isNaN(tableNumber)) {
      throw new BadRequestException('Номер столика должен быть числом');
    }

    if (tableNumber <= 0) {
      throw new BadRequestException(
        'Номер столика должен быть положительным числом',
      );
    }

    return tableNumber;
  }
}

