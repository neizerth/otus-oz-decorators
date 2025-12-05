/**
 * Пример 14: Сравнение примесей (Mixins) и декораторов
 *
 * Этот пример показывает, как одну и ту же задачу можно решить
 * двумя способами: через примеси и через декораторы.
 *
 * Задача: добавить функциональность логирования и кеширования к классу.
 */

import "reflect-metadata";

// ============================================
// РЕШЕНИЕ 1: ЧЕРЕЗ ПРИМЕСИ (MIXINS)
// ============================================

type Constructor<T = {}> = new (...args: any[]) => T;

// Примесь для логирования
class LoggableMixin {
  log(message: string): void {
    console.log(`[MIXIN LOG] ${new Date().toISOString()}: ${message}`);
  }
}

// Примесь для кеширования
class CacheableMixin {
  private cache: Map<string, any> = new Map();

  setCache(key: string, value: any): void {
    this.cache.set(key, value);
  }

  getCache(key: string): any {
    return this.cache.get(key);
  }
}

function applyMixins(derivedCtor: Constructor, ...baseCtors: Constructor[]): void {
  baseCtors.forEach((baseCtor) => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach((name) => {
      if (name !== "constructor") {
        Object.defineProperty(
          derivedCtor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseCtor.prototype, name) ||
            Object.create(null)
        );
      }
    });
  });
}

// Класс с примесями
class UserServiceWithMixin {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  getUserData(id: number): string {
    return `Данные пользователя ${id}`;
  }
}

interface UserServiceWithMixin extends LoggableMixin, CacheableMixin {}
applyMixins(UserServiceWithMixin, LoggableMixin, CacheableMixin);

// ============================================
// РЕШЕНИЕ 2: ЧЕРЕЗ ДЕКОРАТОРЫ
// ============================================

// Декоратор для логирования методов
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    console.log(`[DECORATOR LOG] ${new Date().toISOString()}: Вызов метода ${propertyKey}`);
    const result = original.apply(this, args);
    return result;
  };
  return descriptor;
}

// Декоратор для кеширования методов
function Cache(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  const cache = new Map<string, any>();

  descriptor.value = function (...args: any[]) {
    const key = `${propertyKey}_${JSON.stringify(args)}`;
    
    if (cache.has(key)) {
      console.log(`[DECORATOR CACHE] Кеш найден для ${propertyKey}`);
      return cache.get(key);
    }

    const result = original.apply(this, args);
    cache.set(key, result);
    console.log(`[DECORATOR CACHE] Результат сохранён в кеш для ${propertyKey}`);
    return result;
  };

  return descriptor;
}

// Класс с декораторами
class UserServiceWithDecorator {
  name: string;

  constructor(name: string) {
    this.name = name;
  }

  @Log
  @Cache
  getUserData(id: number): string {
    console.log(`  → Выполняется реальная логика получения данных для пользователя ${id}`);
    return `Данные пользователя ${id}`;
  }
}

// ============================================
// СРАВНЕНИЕ
// ============================================

console.log("=== Пример 14: Сравнение примесей и декораторов ===\n");

console.log("--- РЕШЕНИЕ 1: Через примеси ---");
const userServiceMixin = new UserServiceWithMixin("Сервис с примесями");
userServiceMixin.log("Сервис создан");
userServiceMixin.setCache("user-1", "Данные пользователя 1");
console.log("Результат:", userServiceMixin.getCache("user-1"));
console.log("Метод getUserData:", userServiceMixin.getUserData(1));

console.log("\n--- РЕШЕНИЕ 2: Через декораторы ---");
const userServiceDecorator = new UserServiceWithDecorator("Сервис с декораторами");
console.log("Первый вызов (кеш пуст):");
const result1 = userServiceDecorator.getUserData(1);
console.log("Результат:", result1);

console.log("\nВторой вызов (из кеша):");
const result2 = userServiceDecorator.getUserData(1);
console.log("Результат:", result2);

console.log("\n--- СРАВНЕНИЕ ПОДХОДОВ ---");
console.log(`
┌─────────────────────┬──────────────────────┬──────────────────────┐
│ Критерий            │ Примеси              │ Декораторы           │
├─────────────────────┼──────────────────────┼──────────────────────┤
│ Синтаксис           │ applyMixins()        │ @Decorator           │
│ Добавление методов  │ ✅ Да (новые методы) │ ❌ Нет (обёртка)     │
│ Изменение поведения │ ❌ Нет               │ ✅ Да (методы)       │
│ Типизация           │ ⚠️ Сложнее           │ ✅ Проще             │
│ Читаемость          │ ⚠️ Менее очевидно    │ ✅ Более очевидно    │
│ Гибкость            │ ✅ Высокая           │ ✅ Высокая            │
│ Производительность  │ ✅ Нет накладных     │ ⚠️ Небольшие         │
│                     │    расходов          │    накладные расходы │
└─────────────────────┴──────────────────────┴──────────────────────┘

📌 Когда использовать примеси:
  • Нужно добавить новые методы к классу
  • Нужна функциональность, которая не связана с конкретными методами
  • Хотите переиспользовать функциональность между разными классами

📌 Когда использовать декораторы:
  • Нужно изменить поведение существующих методов
  • Хотите добавить метаданные к классам/методам
  • Нужна более декларативная и читаемая запись
  • Работаете с фреймворками (Nest.js, TS.ed), которые используют декораторы
`);

