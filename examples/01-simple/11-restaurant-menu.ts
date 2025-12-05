/**
 * Пример 11: Меню с кешированием
 */
import "reflect-metadata";
import { Dish } from "./10-restaurant-dish";

function CacheResult(ttl: number = 5000) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.value;
    const cache = new Map<string, { data: any; timestamp: number }>();
    descriptor.value = function (...args: any[]) {
      const key = JSON.stringify(args);
      const cached = cache.get(key);
      if (cached && Date.now() - cached.timestamp < ttl) {
        console.log(`💾 Из кеша: ${propertyKey}`);
        return cached.data;
      }
      const result = original.apply(this, args);
      cache.set(key, { data: result, timestamp: Date.now() });
      console.log(`💿 Сохранено в кеш: ${propertyKey}`);
      return result;
    };
    return descriptor;
  };
}

class Menu {
  private dishes: Dish[] = [];
  addDish(dish: Dish): void {
    this.dishes.push(dish);
  }
  @CacheResult(5000)
  getDishesByCategory(category: string): Dish[] {
    console.log(`🔍 Поиск в категории: ${category}`);
    return this.dishes.filter((d) => d.category === category);
  }
}

console.log("\n=== Пример 11: Меню с кешированием ===");
const menu = new Menu();
menu.addDish(Dish.create("Ролл Калифорния", 450, "sushi"));
menu.addDish(Dish.create("Тонкоцу Рамен", 650, "ramen"));
const result1 = menu.getDishesByCategory("sushi");
const result2 = menu.getDishesByCategory("sushi");
