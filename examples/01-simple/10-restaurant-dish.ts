/**
 * Пример 10: Блюдо в японском ресторане
 */

function ValidatePrice(target: any, propertyKey: string) {
  let value: number;
  Object.defineProperty(target, propertyKey, {
    get: () => value,
    set: (newVal: number) => {
      if (newVal < 0 || newVal > 10000) throw new Error(`Невалидная цена: ${newVal}`);
      value = newVal;
    },
    enumerable: true,
    configurable: true,
  });
}

function LogDishCreation(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`🍱 Создано блюдо: ${args[0]}`);
    return original.apply(this, args);
  };
  return descriptor;
}

export class Dish {
  name: string;
  @ValidatePrice price: number;
  category: string;
  constructor(name: string, price: number, category: string) {
    this.name = name;
    this.price = price;
    this.category = category;
  }
  @LogDishCreation
  static create(name: string, price: number, category: string): Dish {
    return new Dish(name, price, category);
  }
}

console.log("=== Пример 10: Блюдо ===");
const sushi = Dish.create("Ролл Калифорния", 450, "sushi");
console.log(`${sushi.name} - ${sushi.price}₽`);
try {
  Dish.create("Тест", -100, "sushi");
} catch (error) {
  console.log("❌ Ошибка:", (error as Error).message);
}
