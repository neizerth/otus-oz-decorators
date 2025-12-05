# Примеры IoC (Inversion of Control) с декораторами

Этот раздел содержит примеры, демонстрирующие работу IoC контейнера и декоратора `@Injectable` в отрыве от фреймворков.

## Что такое IoC?

**Inversion of Control (Инверсия управления)** - это паттерн проектирования, при котором управление зависимостями передается внешнему контейнеру. Вместо того, чтобы класс сам создавал свои зависимости, контейнер автоматически внедряет их.

## Основные концепции

### 1. Dependency Injection (DI)
Внедрение зависимостей - процесс предоставления зависимостей объекту извне, а не создания их внутри объекта.

### 2. IoC Container
Контейнер, который управляет жизненным циклом объектов и их зависимостями.

### 3. Декоратор @Injectable
Помечает класс как "инжектируемый" - может быть внедрен в другие классы.

## Примеры

### 01-simple-ioc-container.ts
Простая реализация IoC контейнера с нуля. Показывает:
- Как работает декоратор `@Injectable`
- Как работает декоратор `@Inject`
- Как контейнер разрешает зависимости
- Как работает паттерн Singleton

**Запуск:**
```bash
npm run dev:ioc
```

### 02-inversify-example.ts
Пример использования библиотеки InversifyJS. Показывает:
- Как использовать готовую библиотеку для IoC
- Работу с токенами (символами)
- Привязку интерфейсов к реализациям

**Требования:**
```bash
npm install inversify
```

### 03-singleton-vs-transient.ts
Демонстрирует разницу между Singleton и Transient зависимостями:
- **Singleton** - один экземпляр на все приложение
- **Transient** - новый экземпляр при каждом запросе

### 04-optional-dependencies.ts
Показывает, как работать с опциональными зависимостями, которые могут отсутствовать в контейнере.

## Как это работает?

### Без IoC (плохо):
```typescript
class UserService {
  private database = new DatabaseService(); // Жесткая зависимость
  private logger = new LoggerService();     // Жесткая зависимость
  
  getUser(id: number) {
    this.logger.log(`Getting user ${id}`);
    return this.database.findUser(id);
  }
}
```

### С IoC (хорошо):
```typescript
@Injectable()
class UserService {
  constructor(
    private database: DatabaseService,  // Внедряется автоматически
    private logger: LoggerService,       // Внедряется автоматически
  ) {}
  
  getUser(id: number) {
    this.logger.log(`Getting user ${id}`);
    return this.database.findUser(id);
  }
}
```

## Преимущества IoC

1. **Слабая связанность** - классы не зависят от конкретных реализаций
2. **Тестируемость** - легко подменять зависимости в тестах
3. **Гибкость** - легко менять реализации без изменения кода
4. **Управление жизненным циклом** - контейнер управляет созданием и уничтожением объектов

## Связь с NestJS

NestJS использует похожую концепцию:
- `@Injectable()` - помечает класс как провайдер
- `@Inject()` - указывает, какую зависимость внедрить
- Модули регистрируют провайдеры
- NestJS автоматически разрешает зависимости через конструктор

## Дополнительные ресурсы

- [InversifyJS Documentation](https://inversify.io/)
- [NestJS Dependency Injection](https://docs.nestjs.com/providers)
- [TypeScript Decorators](https://www.typescriptlang.org/docs/handbook/decorators.html)

