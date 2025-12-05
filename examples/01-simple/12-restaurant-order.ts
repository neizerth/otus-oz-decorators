/**
 * Пример 12: Заказ с валидацией времени
 */
import "reflect-metadata";
function ValidateReservationTime(target: any, propertyKey: string, parameterIndex: number) {
  const indices = Reflect.getMetadata("validate:reservation", target, propertyKey) || [];
  Reflect.defineMetadata("validate:reservation", [...indices, parameterIndex], target, propertyKey);
}
function CheckReservationTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const indices = Reflect.getMetadata("validate:reservation", target, propertyKey) || [];
    indices.forEach((i: number) => {
      const h = (args[i] as Date).getHours();
      if (h < 18 || h >= 23) throw new Error(`Ресторан работает 18:00-23:00`);
    });
    return original.apply(this, args);
  };
  return descriptor;
}
function LogOrder(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const order = original.apply(this, args);
    console.log(`📝 Заказ #${order.id} на ${order.reservationTime.toLocaleTimeString()}`);
    return order;
  };
  return descriptor;
}
class Order {
  private static nextId = 1;
  id: number;
  customerName: string;
  reservationTime: Date;
  private constructor(customerName: string, reservationTime: Date) {
    this.id = Order.nextId++;
    this.customerName = customerName;
    this.reservationTime = reservationTime;
  }
  @CheckReservationTime
  @LogOrder
  static create(customerName: string, @ValidateReservationTime reservationTime: Date): Order {
    return new Order(customerName, reservationTime);
  }
}
console.log("\n=== Пример 12: Заказ ===");
const time = new Date();
time.setHours(19, 0, 0, 0);
Order.create("Иван", time);
try {
  Order.create("Тест", new Date(2024, 0, 1, 15, 0));
} catch (error) {
  console.log("❌ Ошибка:", (error as Error).message);
}
