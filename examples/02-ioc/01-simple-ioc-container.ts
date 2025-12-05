/**
 * Пример 1: Простая реализация IoC контейнера с @Injectable
 */

import 'reflect-metadata';

function Injectable() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata('injectable', true, constructor);
    return constructor;
  };
}

class Container {
  private providers = new Map<any, any>();
  private instances = new Map<any, any>();

  provide<T>(token: any, provider: { new (...args: any[]): T }): void {
    this.providers.set(token, provider);
  }

  get<T>(token: any): T {
    if (this.instances.has(token)) return this.instances.get(token);
    const Provider = this.providers.get(token);
    const paramTypes = Reflect.getMetadata('design:paramtypes', Provider) || [];
    const deps = paramTypes.map((t: any) => this.get(t));
    const instance = new Provider(...deps);
    this.instances.set(token, instance);
    return instance;
  }
}

@Injectable()
class LoggerService {
  log(msg: string) {
    console.log(`📝 ${msg}`);
  }
}

@Injectable()
class UserService {
  constructor(private logger: LoggerService) {}
  getUser(id: number) {
    this.logger.log(`Getting user ${id}`);
    return { id, name: 'John' };
  }
}

const container = new Container();
container.provide(LoggerService, LoggerService);
container.provide(UserService, UserService);

const userService = container.get<UserService>(UserService);
console.log(userService.getUser(1));
