import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { DishService } from './dish.service';

@Controller('api/dishes')
export class DishController {
  constructor(private dishService: DishService) {}

  @Get()
  getDishes() {
    return this.dishService.findAll();
  }

  @Get(':id')
  getDish(@Param('id') id: number) {
    return this.dishService.findOne(id);
  }
}
