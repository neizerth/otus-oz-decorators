/**
 * Пример 1: Работа без IoC - ручное создание зависимостей
 */

class LoggerService {
  log(msg: string) {
    console.log(`📝 ${msg}`);
  }
}

class UserService {
  constructor(private logger: LoggerService) {}
  
  getUser(id: number) {
    this.logger.log(`Getting user ${id}`);
    return { id, name: 'John' };
  }
}

// Без IoC: создаем зависимости вручную
const logger = new LoggerService();
const userService = new UserService(logger);

console.log(userService.getUser(1));



