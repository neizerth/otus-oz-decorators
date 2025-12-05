/**
 * Пример 7: Кастомные метаданные через декораторы
 *
 * Можно создавать собственные метаданные и использовать их для
 * различных целей, например, для создания роутинга.
 */

import "reflect-metadata";

function Route(path: string) {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    // Сохраняем путь роута в метаданных
    Reflect.defineMetadata("route:path", path, target, propertyKey);
    Reflect.defineMetadata("route:method", "GET", target, propertyKey);
  };
}

function Get(path: string) {
  return Route(path);
}

class Controller {
  @Get("/users")
  getUsers() {
    return ["user1", "user2"];
  }

  @Get("/posts")
  getPosts() {
    return ["post1", "post2"];
  }
}

// Получаем метаданные роутов
console.log("=== Кастомные метаданные через декораторы ===");
const controller = new Controller();
const methods = Object.getOwnPropertyNames(Controller.prototype).filter(
  (name) => name !== "constructor"
);

methods.forEach((methodName) => {
  const route = Reflect.getMetadata(
    "route:path",
    Controller.prototype,
    methodName
  );
  const httpMethod = Reflect.getMetadata(
    "route:method",
    Controller.prototype,
    methodName
  );
  console.log(`Роут: ${httpMethod} ${route} -> ${methodName}`);
});

