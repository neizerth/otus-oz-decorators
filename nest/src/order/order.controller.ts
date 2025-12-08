import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from '../common/dto/create-order.dto';
import { OrderDishDto } from '../common/dto/order-dish.dto';
import { CreateOrderValidationPipe } from './pipes/create-order-validation.pipe';
import { OrderDishValidationPipe } from './pipes/order-dish-validation.pipe';
import { TableNumberValidationPipe } from './pipes/table-number-validation.pipe';
import { TableFreeGuard } from './guards/table-free.guard';
import { RateLimitGuard } from '../common/guards/rate-limit.guard';

@Controller('api/orders')
@UseGuards(RateLimitGuard) // Rate limiting для всех эндпоинтов
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get()
  getOrders() {
    return this.orderService.findAll();
  }

  @Post()
  @UseGuards(TableFreeGuard) // Проверка свободности столика
  @UsePipes(new CreateOrderValidationPipe())
  createOrder(@Body() body: CreateOrderDto) {
    return this.orderService.create(
      body.tableId,
      body.menuSetId,
      body.duration,
      body.persons,
    );
  }

  @Get('tables/:tableNumber/active')
  async getActiveOrder(
    @Param('tableNumber', TableNumberValidationPipe) tableNumber: number,
  ) {
    const order = await this.orderService.getActiveOrderByTableNumber(
      tableNumber,
    );
    if (!order) {
      return null;
    }
    return order;
  }

  @Post('tables/:tableNumber/order-dish')
  orderDish(
    @Param('tableNumber', TableNumberValidationPipe) tableNumber: number,
    @Body(new OrderDishValidationPipe()) body: OrderDishDto,
  ) {
    return this.orderService.orderDish(tableNumber, body.dishId);
  }
}
