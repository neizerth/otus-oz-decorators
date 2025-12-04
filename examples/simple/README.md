# Простые примеры декораторов в TypeScript

Здесь собраны простые примеры использования декораторов на чистом TypeScript.

## Порядок изучения

### Шаг 1: Паттерн декоратора в JavaScript (важно изучить сначала!)

1. **01-js-function-decorator.js** - Декоратор функции в JavaScript
   ```bash
   node examples/simple/01-js-function-decorator.js
   ```
   Показывает, как работает декоратор функции без синтаксического сахара TypeScript.

2. **02-js-method-decorator.js** - Декоратор метода класса в JavaScript
   ```bash
   node examples/simple/02-js-method-decorator.js
   ```
   Показывает, как работает декоратор метода класса.

3. **03-js-class-decorator.js** - Декоратор класса в JavaScript
   ```bash
   node examples/simple/03-js-class-decorator.js
   ```
   Показывает, как работает декоратор класса.

### Шаг 2: Компиляция декораторов

4. **04-compiled-decorator.ts** - Как TypeScript компилирует декораторы
   ```bash
   npm run compile:example
   # Посмотрите на сгенерированный .js файл
   ```
   Показывает, во что превращаются декораторы после компиляции.

### Шаг 3: reflect-metadata

5. **05-reflect-metadata-basic.ts** - Базовое использование reflect-metadata
6. **06-reflect-metadata-params.ts** - Метаданные для параметров методов
7. **07-reflect-metadata-custom.ts** - Кастомные метаданные через декораторы
8. **08-reflect-metadata-properties.ts** - Метаданные для типов свойств

   Объясняет, зачем нужен reflect-metadata и как он работает.

### Шаг 4: Декораторы в TypeScript

9. **09-basic-decorator.ts** - Базовый декоратор в TypeScript

### Шаг 5: Практические примеры - Японский ресторан

10. **10-restaurant-dish.ts** - Блюдо с валидацией и логированием
11. **11-restaurant-menu.ts** - Меню с кешированием
12. **12-restaurant-order.ts** - Заказ с валидацией времени

### Шаг 6: Примеси и сравнение с декораторами

13. **13-mixins-applyMixins.ts** - Примеси с использованием `applyMixins`
    ```bash
    ts-node-dev --respawn --transpile-only examples/simple/13-mixins-applyMixins.ts
    ```
    Показывает, как использовать примеси для добавления функциональности к классам без наследования.

14. **14-mixins-vs-decorators.ts** - Сравнение примесей и декораторов
    ```bash
    ts-node-dev --respawn --transpile-only examples/simple/14-mixins-vs-decorators.ts
    ```
    Демонстрирует, как одну и ту же задачу можно решить через примеси и через декораторы, и когда что использовать.

После понимания основ можно переходить к более сложным примерам декораторов.

## Запуск

```bash
npm run dev:simple
```

Или напрямую:
```bash
ts-node-dev --respawn --transpile-only examples/simple/index.ts
```

## Что такое ts-node-dev?

`ts-node-dev` - это инструмент для разработки TypeScript-приложений, который:
- Автоматически компилирует TypeScript в JavaScript
- Перезапускает приложение при изменении файлов (благодаря флагу `--respawn`)
- Не проверяет типы при каждой перезагрузке (благодаря `--transpile-only`), что ускоряет разработку

Это удобная альтернатива `ts-node` для разработки, так как не нужно вручную перезапускать приложение после каждого изменения.
