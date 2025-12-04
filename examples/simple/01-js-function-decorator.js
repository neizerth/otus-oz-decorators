/**
 * Пример 1: Декоратор функции в JavaScript
 *
 * Декоратор - это паттерн проектирования, который позволяет добавлять
 * новое поведение к объектам динамически, не изменяя их структуру.
 *
 * В JavaScript декоратор функции - это функция, которая принимает функцию
 * и возвращает новую функцию с дополнительным поведением.
 */

// Простой пример декоратора функции
function logDecorator(originalFunction) {
  // Возвращаем новую функцию, которая оборачивает оригинальную
  return function (...args) {
    console.log(`Вызывается функция: ${originalFunction.name}`);
    console.log("Аргументы:", args);

    // Вызываем оригинальную функцию
    const result = originalFunction.apply(this, args);

    console.log("Результат:", result);
    return result;
  };
}

// Обычная функция
function greet(name) {
  return `Привет, ${name}!`;
}

// Применяем декоратор
const decoratedGreet = logDecorator(greet);

// Используем декорированную функцию
console.log("=== Декоратор функции ===");
const result = decoratedGreet("Иван");
console.log("Итоговый результат:", result);
