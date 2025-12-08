/**
 * Пример 2: Работа без IoC - вложенные зависимости
 */

class DatabaseService {
  connect() {
    return 'Connected to DB';
  }
}

class LoggerService {
  log(msg: string) {
    console.log(`📝 ${msg}`);
  }
}

class UserService {
  constructor(
    private db: DatabaseService,
    private logger: LoggerService,
  ) {}
  
  getUser(id: number) {
    this.logger.log(`Getting user ${id}`);
    this.db.connect();
    return { id, name: 'Jane' };
  }
}

// Без IoC: создаем все зависимости вручную
const db = new DatabaseService();
const logger = new LoggerService();
const userService = new UserService(db, logger);

console.log(userService.getUser(2));

