/**
 * Пример 2: IoC с библиотекой InversifyJS
 */

import 'reflect-metadata';
import { injectable, inject, Container } from 'inversify';

const TYPES = {
  Logger: Symbol.for('Logger'),
  UserService: Symbol.for('UserService'),
};

@injectable()
class LoggerService {
  log(msg: string) {
    console.log(`📝 ${msg}`);
  }
}

@injectable()
class UserService {
  constructor(@inject(TYPES.Logger) private logger: LoggerService) {}
  getUser(id: number) {
    this.logger.log(`Getting user ${id}`);
    return { id, name: 'Jane' };
  }
}

const container = new Container();
container.bind(TYPES.Logger).to(LoggerService);
container.bind(TYPES.UserService).to(UserService);

const userService = container.get(TYPES.UserService) as UserService;
console.log(userService.getUser(2));
