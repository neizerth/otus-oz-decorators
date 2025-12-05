/**
 * Пример 13: Примеси (Mixins) с использованием applyMixins
 *
 * Примеси - это способ добавления функциональности к классам
 * без использования наследования. Это альтернатива множественному наследованию.
 *
 * applyMixins - это вспомогательная функция, которая применяет
 * методы и свойства из нескольких классов-примесей к целевому классу.
 */

// Базовый тип для конструктора
type Constructor<T = {}> = new (...args: any[]) => T;

// Примесь 1: Функциональность логирования
class Loggable {
  log(message: string): void {
    console.log(`[LOG] ${new Date().toISOString()}: ${message}`);
  }
}

// Примесь 2: Функциональность кеширования
class Cacheable {
  private cache: Map<string, any> = new Map();

  setCache(key: string, value: any): void {
    this.cache.set(key, value);
    console.log(`💾 Кеш сохранён: ${key}`);
  }

  getCache(key: string): any {
    const value = this.cache.get(key);
    if (value) {
      console.log(`📦 Кеш получен: ${key}`);
    }
    return value;
  }

  clearCache(): void {
    this.cache.clear();
    console.log("🗑️ Кеш очищен");
  }
}

// Примесь 3: Функциональность валидации
class Validatable {
  private errors: string[] = [];

  addError(error: string): void {
    this.errors.push(error);
  }

  validate(): boolean {
    if (this.errors.length > 0) {
      console.log(`❌ Ошибки валидации: ${this.errors.join(", ")}`);
      return false;
    }
    console.log("✅ Валидация пройдена");
    return true;
  }

  clearErrors(): void {
    this.errors = [];
  }
}

// Функция applyMixins - применяет примеси к классу
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

// Базовый класс - пользователь
class User {
  name: string;
  email: string;

  constructor(name: string, email: string) {
    this.name = name;
    this.email = email;
  }

  getInfo(): string {
    return `${this.name} (${this.email})`;
  }
}

// Применяем примеси к классу User
// Теперь User имеет методы из Loggable, Cacheable и Validatable
interface User extends Loggable, Cacheable, Validatable {}
applyMixins(User, Loggable, Cacheable, Validatable);

// Базовый класс - продукт
class Product {
  id: number;
  name: string;
  price: number;

  constructor(id: number, name: string, price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

// Применяем только некоторые примеси к Product
interface Product extends Loggable, Cacheable {}
applyMixins(Product, Loggable, Cacheable);

console.log("=== Пример 13: Примеси с applyMixins ===\n");

// Использование User с примесями
console.log("--- Пользователь с примесями ---");
const user = new User("Иван", "ivan@example.com");
console.log(user.getInfo());

// Используем функциональность из примеси Loggable
user.log("Пользователь создан");

// Используем функциональность из примеси Cacheable
user.setCache("profile", { name: user.name, email: user.email });
const cachedProfile = user.getCache("profile");
console.log("Профиль из кеша:", cachedProfile);

// Используем функциональность из примеси Validatable
if (!user.email.includes("@")) {
  user.addError("Email должен содержать @");
}
user.validate();

console.log("\n--- Продукт с примесями ---");
const product = new Product(1, "Ноутбук", 50000);
product.log(`Продукт ${product.name} создан`);
product.setCache("product-1", product);
const cachedProduct = product.getCache("product-1");
console.log("Продукт из кеша:", cachedProduct?.name);

// Проверяем, что у Product нет метода validate (мы не применяли Validatable)
console.log("\n--- Проверка доступных методов ---");
console.log("User имеет validate:", typeof (user as any).validate === "function");
console.log("Product имеет validate:", typeof (product as any).validate === "function");
console.log("User имеет log:", typeof (user as any).log === "function");
console.log("Product имеет log:", typeof (product as any).log === "function");

