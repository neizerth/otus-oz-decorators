import {
  Inject,
  Module,
  type OnModuleInit,
} from '@nestjs/common';
import {
  getDataSourceToken,
  TypeOrmModule,
} from '@nestjs/typeorm';
import type { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DishModule } from './dish/dish.module';
import {
  Dish,
  MenuSet,
  Order,
  Table,
  TableOrder,
} from './entities';
import { MenuSetModule } from './menu-set/menu-set.module';
import { OrderModule } from './order/order.module';
import { TableModule } from './table/table.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'restaurant.db',
      entities: [
        Table,
        Dish,
        MenuSet,
        Order,
        TableOrder,
      ],
      synchronize: true,
    }),
    TableModule,
    DishModule,
    MenuSetModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  constructor(
    @Inject(getDataSourceToken())
    private dataSource: DataSource,
  ) {}

  async onModuleInit() {
    const tableRepo =
      this.dataSource.getRepository(Table);
    const dishRepo =
      this.dataSource.getRepository(Dish);
    const menuSetRepo =
      this.dataSource.getRepository(MenuSet);

    if ((await tableRepo.count()) === 0) {
      await tableRepo.save([
        { number: 1 },
        { number: 2 },
        { number: 3 },
        { number: 4 },
      ]);
    }

    const dishCount = await dishRepo.count();
    if (dishCount === 0) {
      const europeanDishes = await dishRepo.save([
        {
          name: 'Борщ',
          description:
            'Традиционный украинский суп',
        },
        {
          name: 'Шницель',
          description:
            'Венский шницель с картофелем',
        },
        {
          name: 'Рагу из говядины',
          description:
            'Тушеная говядина с овощами',
        },
        {
          name: 'Котлета по-киевски',
          description: 'Куриная котлета с маслом',
        },
        {
          name: 'Гуляш',
          description: 'Венгерское мясное блюдо',
        },
        {
          name: 'Свиная отбивная',
          description: 'Жареная свинина',
        },
        {
          name: 'Куриное филе',
          description: 'Запеченное куриное филе',
        },
        {
          name: 'Рыбное филе',
          description: 'Запеченная рыба',
        },
        {
          name: 'Картофель фри',
          description: 'Жареный картофель',
        },
        {
          name: 'Овощное рагу',
          description: 'Тушеные овощи',
        },
      ]);

      const japaneseDishes = await dishRepo.save([
        {
          name: 'Суши ролл Калифорния',
          description: 'Ролл с крабом и авокадо',
        },
        {
          name: 'Суши ролл Филадельфия',
          description: 'Ролл с лососем и сыром',
        },
        {
          name: 'Сашими из тунца',
          description: 'Сырой тунец',
        },
        {
          name: 'Темпура',
          description:
            'Жареные морепродукты в кляре',
        },
        {
          name: 'Рамен',
          description: 'Японский суп с лапшой',
        },
        {
          name: 'Якитори',
          description: 'Куриные шашлычки',
        },
        {
          name: 'Терияки',
          description: 'Курица в соусе терияки',
        },
        {
          name: 'Мисо суп',
          description:
            'Традиционный японский суп',
        },
        {
          name: 'Гункан с икрой',
          description: 'Суши с икрой',
        },
        {
          name: 'Унаги',
          description: 'Жареный угорь',
        },
      ]);

      const italianDishes = await dishRepo.save([
        {
          name: 'Паста Карбонара',
          description:
            'Паста с беконом и сливками',
        },
        {
          name: 'Паста Болоньезе',
          description: 'Паста с мясным соусом',
        },
        {
          name: 'Пицца Маргарита',
          description: 'Классическая пицца',
        },
        {
          name: 'Пицца Пепперони',
          description: 'Пицца с колбасой',
        },
        {
          name: 'Ризотто с грибами',
          description: 'Рис с грибами',
        },
        {
          name: 'Лазанья',
          description: 'Запеченная паста с мясом',
        },
        {
          name: 'Равиоли',
          description: 'Пельмени с начинкой',
        },
        {
          name: 'Гноччи',
          description: 'Картофельные клецки',
        },
        {
          name: 'Оссобуко',
          description: 'Тушеная телячья ножка',
        },
        {
          name: 'Тирамису',
          description: 'Итальянский десерт',
        },
      ]);

      const salads = await dishRepo.save([
        {
          name: 'Салат Цезарь',
          description: 'Салат с курицей и соусом',
        },
        {
          name: 'Греческий салат',
          description: 'Салат с сыром фета',
        },
        {
          name: 'Оливье',
          description: 'Традиционный салат',
        },
        {
          name: 'Винегрет',
          description: 'Овощной салат',
        },
        {
          name: 'Салат с тунцом',
          description:
            'Салат с консервированным тунцом',
        },
        {
          name: 'Капрезе',
          description:
            'Салат с моцареллой и томатами',
        },
        {
          name: 'Салат Вальдорф',
          description:
            'Салат с яблоками и орехами',
        },
        {
          name: 'Салат Нисуаз',
          description: 'Французский салат',
        },
        {
          name: 'Салат с креветками',
          description: 'Салат с морепродуктами',
        },
        {
          name: 'Салат с авокадо',
          description: 'Свежий салат с авокадо',
        },
      ]);

      const desserts = await dishRepo.save([
        {
          name: 'Чизкейк',
          description: 'Творожный торт',
        },
        {
          name: 'Тирамису',
          description: 'Итальянский десерт',
        },
        {
          name: 'Брауни',
          description: 'Шоколадный пирог',
        },
        {
          name: 'Крем-брюле',
          description: 'Французский десерт',
        },
        {
          name: 'Мороженое',
          description: 'Ванильное мороженое',
        },
        {
          name: 'Панна-котта',
          description: 'Итальянский десерт',
        },
        {
          name: 'Торт Наполеон',
          description: 'Слоеный торт',
        },
        {
          name: 'Эклер',
          description: 'Заварное пирожное',
        },
        {
          name: 'Профитроли',
          description: 'Маленькие эклеры',
        },
        {
          name: 'Медовик',
          description: 'Медовый торт',
        },
      ]);

      const drinks = await dishRepo.save([
        {
          name: 'Кола',
          description: 'Газированный напиток',
        },
        {
          name: 'Сок апельсиновый',
          description: 'Свежевыжатый сок',
        },
        {
          name: 'Сок яблочный',
          description: 'Яблочный сок',
        },
        {
          name: 'Вода минеральная',
          description: 'Газированная вода',
        },
        {
          name: 'Чай черный',
          description: 'Горячий чай',
        },
        {
          name: 'Чай зеленый',
          description: 'Зеленый чай',
        },
        {
          name: 'Кофе эспрессо',
          description: 'Крепкий кофе',
        },
        {
          name: 'Кофе капучино',
          description: 'Кофе с молоком',
        },
        {
          name: 'Лимонад',
          description: 'Домашний лимонад',
        },
        {
          name: 'Морс',
          description: 'Ягодный морс',
        },
      ]);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const endOfDay = new Date();
      endOfDay.setHours(23, 59, 59, 999);

      await menuSetRepo.save([
        {
          name: 'Европейская кухня',
          startTime: today,
          endTime: endOfDay,
          dishes: [
            ...europeanDishes,
            salads[0],
            salads[1],
            drinks[0],
            drinks[1],
            drinks[2],
            drinks[3],
            drinks[4],
            drinks[5],
            drinks[6],
            drinks[7],
            drinks[8],
            drinks[9],
          ],
        },
        {
          name: 'Японская кухня',
          startTime: today,
          endTime: endOfDay,
          dishes: [
            ...japaneseDishes,
            salads[2],
            drinks[0],
            drinks[1],
            drinks[2],
            drinks[3],
            drinks[4],
            drinks[5],
            drinks[6],
            drinks[7],
            drinks[8],
            drinks[9],
          ],
        },
        {
          name: 'Итальянская кухня',
          startTime: today,
          endTime: endOfDay,
          dishes: [
            ...italianDishes,
            salads[5],
            desserts[1],
            drinks[0],
            drinks[1],
            drinks[2],
            drinks[3],
            drinks[4],
            drinks[5],
            drinks[6],
            drinks[7],
            drinks[8],
            drinks[9],
          ],
        },
        {
          name: 'Салаты',
          startTime: today,
          endTime: endOfDay,
          dishes: [
            ...salads,
            drinks[0],
            drinks[1],
            drinks[2],
            drinks[3],
            drinks[4],
            drinks[5],
            drinks[6],
            drinks[7],
            drinks[8],
            drinks[9],
          ],
        },
        {
          name: 'Десерты',
          startTime: today,
          endTime: endOfDay,
          dishes: [
            ...desserts,
            drinks[0],
            drinks[1],
            drinks[2],
            drinks[3],
            drinks[4],
            drinks[5],
            drinks[6],
            drinks[7],
            drinks[8],
            drinks[9],
          ],
        },
      ]);
    }
  }
}
