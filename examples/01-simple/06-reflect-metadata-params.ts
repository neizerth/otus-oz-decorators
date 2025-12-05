/**
 * Пример 6: Метаданные для параметров методов
 *
 * С помощью reflect-metadata можно получать информацию о типах параметров
 * методов во время выполнения (требует emitDecoratorMetadata: true).
 */

import "reflect-metadata";

function ParamType(target: any, propertyKey: string, parameterIndex: number) {
  // Получаем типы параметров (работает только с emitDecoratorMetadata: true)
  const paramTypes = Reflect.getMetadata(
    "design:paramtypes",
    target,
    propertyKey
  );
  console.log(
    `Тип параметра ${parameterIndex} метода ${propertyKey}:`,
    paramTypes[parameterIndex].name
  );
}

class Service {
  process(@ParamType data: string, @ParamType count: number) {
    return `Обработано: ${data}, количество: ${count}`;
  }
}

console.log("=== Метаданные для параметров методов ===");
const service = new Service();
service.process("тест", 5);

