# Guards в NestJS

Guards используются для контроля доступа и бизнес-логики. Они выполняются после middleware, но до interceptors и pipes.

## Созданные Guards

### 1. RateLimitGuard
Простой rate limiting для защиты от спама. Ограничивает количество запросов с одного IP (10 запросов в минуту).

**Использование:**
```typescript
@UseGuards(RateLimitGuard)
@Get('api/data')
getData() {
  return 'Защищено от спама';
}
```

### 2. MenuSetTimeGuard
Проверяет, что набор меню доступен в текущее время. Заказы можно создавать только если текущее время в диапазоне `startTime - endTime` меню.

**Использование:**
```typescript
@Post('orders')
@UseGuards(MenuSetTimeGuard)
createOrder(@Body() body: CreateOrderDto) {
  // Проверка времени меню выполняется автоматически
}
```

### 3. TableFreeGuard
Проверяет, что столик свободен перед созданием нового заказа. Нельзя создать новый заказ, если у столика уже есть активный заказ.

**Использование:**
```typescript
@Post('orders')
@UseGuards(TableFreeGuard)
createOrder(@Body() body: CreateOrderDto) {
  // Проверка свободности столика выполняется автоматически
}
```

## Порядок выполнения

1. **Middleware** - выполняется первым
2. **Guards** - проверка доступа и бизнес-правил
3. **Interceptors (before)** - логирование, трансформация
4. **Pipes** - валидация и трансформация данных
5. **Controller** - обработка запроса
6. **Interceptors (after)** - трансформация ответа

## Примеры в проекте

В `OrderController` используются:
- `RateLimitGuard` - глобально для всех эндпоинтов (защита от спама)
- `MenuSetTimeGuard` - для проверки доступности меню при создании заказа
- `TableFreeGuard` - для проверки свободности столика перед созданием заказа

## Комбинирование Guards

Guards можно комбинировать:
```typescript
@Post('orders')
@UseGuards(MenuSetTimeGuard, TableFreeGuard)
createOrder(@Body() body: CreateOrderDto) {
  // Оба guard выполнятся последовательно
}
```

Если любой guard вернет `false` или выбросит исключение, запрос будет отклонен.
