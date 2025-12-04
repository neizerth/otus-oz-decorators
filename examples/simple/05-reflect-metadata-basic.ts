/**
 * Пример 5: Базовое использование reflect-metadata
 *
 * reflect-metadata - это полифилл для работы с метаданными в TypeScript.
 * Он добавляет возможность хранить и получать метаданные о типах во время выполнения.
 *
 * Без reflect-metadata декораторы могут изменять поведение, но не могут
 * получать информацию о типах параметров, возвращаемых значений и т.д.
 */

import "reflect-metadata";

// Сохраняем метаданные
class User {
  name: string = "";
  age: number = 0;
}

// Добавляем метаданные к классу
Reflect.defineMetadata("design:type", User, User);
Reflect.defineMetadata("custom:table", "users", User);

// Получаем метаданные
const tableName = Reflect.getMetadata("custom:table", User);
console.log("=== Базовое использование reflect-metadata ===");
console.log("Имя таблицы:", tableName);

/**
 * Важно понимать:
 * - reflect-metadata нужен для работы с типами во время выполнения
 * - Без него декораторы работают, но не могут получить информацию о типах
 * - emitDecoratorMetadata: true в tsconfig.json автоматически добавляет
 *   метаданные о типах (design:type, design:paramtypes, design:returntype)
 */

