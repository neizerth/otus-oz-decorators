import {
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { OrderService } from './order.service';

@Controller('api/orders')
export class OrderController {
  constructor(
    private orderService: OrderService,
  ) {}

  @Get()
  getOrders() {
    return this.orderService.findAll();
  }

  @Post()
  createOrder(
    @Body() body: {
      tableId: number;
      menuSetId: number;
      duration: number;
      persons: number;
    },
  ) {
    return this.orderService.create(
      body.tableId,
      body.menuSetId,
      body.duration,
      body.persons,
    );
  }

  @Get('tables/:tableNumber/active')
  async getActiveOrder(
    @Param('tableNumber') tableNumber: number,
  ) {
    const order =
      await this.orderService.getActiveOrderByTableNumber(
        tableNumber,
      );
    if (!order) {
      return null;
    }
    return order;
  }

  @Post('tables/:tableNumber/order-dish')
  orderDish(
    @Param('tableNumber') tableNumber: number,
    @Body() body: { dishId: number },
  ) {
    return this.orderService.orderDish(
      tableNumber,
      body.dishId,
    );
  }
}
