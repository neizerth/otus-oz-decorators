import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { Dish, Order, Table, TableOrder } from '../entities';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepo: Repository<Order>,
    @InjectRepository(Table)
    private tableRepo: Repository<Table>,
    @InjectRepository(Dish)
    private dishRepo: Repository<Dish>,
    @InjectRepository(TableOrder)
    private tableOrderRepo: Repository<TableOrder>,
  ) {}

  findAll() {
    return this.orderRepo.find({
      relations: ['menuSet', 'table'],
    });
  }

  async create(
    tableId: number,
    menuSetId: number,
    duration: number,
    persons: number,
  ) {
    const table = await this.tableRepo.findOne({
      where: { id: tableId },
    });
    if (!table) throw new BadRequestException('Столик не найден');

    const order = await this.orderRepo.save({
      table: { id: tableId },
      menuSet: { id: menuSetId },
      duration,
      persons,
    });

    table.activeOrderId = order.id;
    await this.tableRepo.save(table);

    return order;
  }

  async getActiveOrderByTableNumber(tableNumber: number) {
    const table = await this.tableRepo.findOne({
      where: { number: tableNumber },
    });
    if (!table) throw new BadRequestException('Столик не найден');

    if (!table.activeOrderId) {
      return null;
    }

    const order = await this.orderRepo.findOne({
      where: { id: table.activeOrderId },
      relations: ['menuSet', 'menuSet.dishes'],
    });

    if (!order) {
      return null;
    }

    const tableOrders = await this.tableOrderRepo.find({
      where: { order: { id: order.id } },
      relations: ['dishes'],
      order: { orderTime: 'DESC' },
    });

    const allDishes = tableOrders.flatMap((to) => to.dishes || []);
    const lastTableOrderTime =
      tableOrders.length > 0 ? tableOrders[0].orderTime : null;

    return {
      ...order,
      dishes: allDishes,
      lastTableOrderTime,
    };
  }

  async orderDish(tableNumber: number, dishId: number) {
    const table = await this.tableRepo.findOne({
      where: { number: tableNumber },
    });
    if (!table) throw new BadRequestException('Столик не найден');

    if (!table.activeOrderId)
      throw new BadRequestException('Нет активного заказа за столиком');

    const order = await this.orderRepo.findOne({
      where: { id: table.activeOrderId },
    });
    if (!order) throw new BadRequestException('Активный заказ не найден');

    const dish = await this.dishRepo.findOne({
      where: { id: dishId },
    });
    if (!dish) throw new BadRequestException('Блюдо не найдено');

    const persons = order.persons ?? 1;
    const limit = persons * 2;

    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    // Получаем все TableOrder за последние 5 минут для данного Order
    const recentTableOrders = await this.tableOrderRepo.find({
      where: { order: { id: order.id } },
      relations: ['dishes'],
      order: { orderTime: 'DESC' },
    });

    // Фильтруем только те, что были созданы за последние 5 минут
    const recentTableOrdersInWindow = recentTableOrders.filter(
      (to) => to.orderTime > fiveMinutesAgo,
    );

    // Считаем общее количество блюд во всех TableOrder за последние 5 минут
    const totalDishesCount = recentTableOrdersInWindow.reduce(
      (sum, to) => sum + (to.dishes?.length || 0),
      0,
    );

    if (totalDishesCount >= limit) {
      throw new BadRequestException(
        `Максимум блюд за заказ: ${limit} (на ${persons} ${
          persons === 1 ? 'персону' : 'персон'
        })`,
      );
    }

    // Если есть последний TableOrder в окне 5 минут, добавляем блюдо к нему
    const lastTableOrder = recentTableOrdersInWindow[0];
    if (lastTableOrder) {
      if (!lastTableOrder.dishes) lastTableOrder.dishes = [];
      lastTableOrder.dishes.push(dish);
      return this.tableOrderRepo.save(lastTableOrder);
    }

    // Иначе создаем новый TableOrder
    const newTableOrder = await this.tableOrderRepo.save({
      order: { id: order.id },
      dishes: [dish],
    });

    return newTableOrder;
  }
}
