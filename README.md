# Декораторы в TypeScript

Проект для изучения декораторов в TypeScript на примерах простых TS-кода и TS.ed фреймворка.

## Структура проекта

- `examples/simple/` - простые примеры на чистом TypeScript
- `examples/tsed/` - примеры с использованием TS.ed фреймворка
- `docs/` - документация и презентация

## Установка

```bash
npm install
```

## Запуск примеров

### Простые примеры TypeScript
```bash
npm run dev:simple
```

### Примеры с TS.ed
```bash
npm run dev:tsed
```

## Настройка TypeScript

В `tsconfig.json` включены важные опции для работы с декораторами:
- `experimentalDecorators: true` - включает поддержку декораторов
- `emitDecoratorMetadata: true` - включает метаданные для декораторов (нужно для работы с reflect-metadata)

