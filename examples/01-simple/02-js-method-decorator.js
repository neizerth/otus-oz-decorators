/**
 * Пример 2: Декоратор метода класса в JavaScript
 *
 * Декоратор метода - это функция, которая принимает объект, имя метода
 * и дескриптор свойства, и возвращает модифицированный дескриптор.
 */

// Декоратор для методов класса
function methodDecorator(target, propertyKey, descriptor) {
  const originalMethod = descriptor.value;

  // Заменяем метод на новую версию
  descriptor.value = function (...args) {
    console.log(`Вызывается метод: ${propertyKey}`);
    console.log("Аргументы:", args);

    const result = originalMethod.apply(this, args);

    console.log("Результат:", result);
    return result;
  };

  return descriptor;
}

// Класс с методом
class Calculator {
  add(a, b) {
    return a + b;
  }
}

// Применяем декоратор вручную
const addDescriptor = Object.getOwnPropertyDescriptor(
  Calculator.prototype,
  "add"
);
const decoratedDescriptor = methodDecorator(
  Calculator.prototype,
  "add",
  addDescriptor
);
Object.defineProperty(Calculator.prototype, "add", decoratedDescriptor);

console.log("=== Декоратор метода класса ===");
const calc = new Calculator();
const sum = calc.add(5, 3);
console.log("Итоговый результат:", sum);

