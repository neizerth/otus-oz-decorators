/**
 * Пример 8: Метаданные для типов свойств
 *
 * Можно использовать метаданные для генерации схем, валидации
 * и других задач на основе информации о свойствах класса.
 */

import "reflect-metadata";

function Column(type: string) {
  return function (target: any, propertyKey: string) {
    Reflect.defineMetadata("column:type", type, target, propertyKey);
  };
}

class Entity {
  @Column("VARCHAR(255)")
  name: string = "";

  @Column("INT")
  age: number = 0;

  @Column("BOOLEAN")
  active: boolean = false;
}

// Генерируем SQL схему на основе метаданных
function generateSchema(entityClass: any) {
  const properties = Object.getOwnPropertyNames(new entityClass());
  const columns: string[] = [];

  properties.forEach((prop) => {
    const columnType = Reflect.getMetadata(
      "column:type",
      entityClass.prototype,
      prop
    );
    if (columnType) {
      columns.push(`  ${prop} ${columnType}`);
    }
  });

  return `CREATE TABLE ${entityClass.name} (\n${columns.join(",\n")}\n);`;
}

console.log("=== Метаданные для типов свойств ===");
console.log(generateSchema(Entity));

