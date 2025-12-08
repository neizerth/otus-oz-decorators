# Exception Filters в NestJS

Exception Filters используются для обработки исключений и форматирования ответов в едином формате.

## Созданные Filters

### 1. HttpExceptionFilter
Обрабатывает все HTTP исключения (BadRequestException, NotFoundException и т.д.) и форматирует их в едином формате.

**Формат ответа:**
```json
{
  "statusCode": 400,
  "timestamp": "2025-12-05T14:30:00.000Z",
  "path": "/api/orders",
  "method": "POST",
  "message": "Ошибка валидации данных",
  "errors": ["Поле 'tableId' обязательно для заполнения"]
}
```

### 2. ValidationExceptionFilter
Специальный фильтр для ошибок валидации. Распознает ошибки валидации и форматирует их с массивом `errors`.

**Использование:**
```typescript
@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  // Обрабатывает ошибки валидации
}
```

### 3. AllExceptionsFilter
Обрабатывает все исключения, включая необработанные ошибки. Используется как fallback.

**Особенности:**
- Обрабатывает HTTP исключения стандартным образом
- Для необработанных ошибок возвращает 500
- В режиме разработки (`NODE_ENV=development`) показывает детали ошибки

## Применение

Фильтры применяются глобально в `main.ts`:

```typescript
app.useGlobalFilters(
  new ValidationExceptionFilter(),
  new AllExceptionsFilter(),
);
```

## Порядок выполнения

1. **ValidationExceptionFilter** - обрабатывает ошибки валидации
2. **AllExceptionsFilter** - обрабатывает все остальные исключения

## Примеры использования

### В контроллере (локально):
```typescript
@Controller('api/orders')
@UseFilters(ValidationExceptionFilter)
export class OrderController {
  // Фильтр применяется только к этому контроллеру
}
```

### На уровне метода:
```typescript
@Post()
@UseFilters(HttpExceptionFilter)
createOrder(@Body() body: CreateOrderDto) {
  // Фильтр применяется только к этому методу
}
```

## Формат ошибок

Все ошибки возвращаются в едином формате:
- `statusCode` - HTTP статус код
- `timestamp` - время возникновения ошибки
- `path` - путь запроса
- `method` - HTTP метод
- `message` - сообщение об ошибке
- `errors` - массив ошибок (для валидации)



