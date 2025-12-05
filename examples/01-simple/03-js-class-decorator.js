/**
 * Пример 3: Декоратор класса в JavaScript
 *
 * Декоратор класса - это функция, которая принимает конструктор класса
 * и возвращает новый конструктор (или модифицирует существующий).
 */

// Декоратор класса (оборачивает конструктор)
function classDecorator(constructor) {
  // Возвращаем новый класс, который расширяет оригинальный
  return class extends constructor {
    constructor(...args) {
      super(...args);
      console.log("Экземпляр класса создан");
    }
  };
}

// Класс для декорирования
class Calculator {
  add(a, b) {
    return a + b;
  }
}

// Применяем декоратор
const DecoratedCalculator = classDecorator(Calculator);

console.log("=== Декоратор класса ===");
const decoratedCalc = new DecoratedCalculator();
console.log("Результат сложения:", decoratedCalc.add(10, 20));
