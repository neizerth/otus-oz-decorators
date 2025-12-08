/**
 * Пример 9: Самый простой декоратор в TypeScript
 *
 * Декоратор - это специальная функция, которая может изменять классы,
 * методы, свойства или параметры.
 *
 * В TypeScript декораторы начинаются с символа @
 *
 */

// Простой декоратор функции
function simpleDecorator(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  console.log(`Декоратор применён к методу: ${propertyKey}`);
  console.log("target:", target);
  console.log("descriptor:", descriptor);
}

class MyClass {
  @simpleDecorator
  myMethod() {
    console.log("Выполняется myMethod");
  }
}

// Создаём экземпляр и вызываем метод
console.log("=== Базовый декоратор в TypeScript ===");
const instance = new MyClass();
instance.myMethod();

