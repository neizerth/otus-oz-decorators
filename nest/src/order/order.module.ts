import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  Dish,
  Order,
  Table,
  TableOrder,
} from '../entities';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { MenuSetTimeGuard } from './guards/menu-set-time.guard';
import { TableFreeGuard } from './guards/table-free.guard';
import { MenuSetModule } from '../menu-set/menu-set.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Order,
      Table,
      Dish,
      TableOrder,
    ]),
    MenuSetModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, MenuSetTimeGuard, TableFreeGuard],
  exports: [OrderService],
})
export class OrderModule {}
