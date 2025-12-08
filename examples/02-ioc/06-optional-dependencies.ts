/**
 * Пример 6: Опциональные зависимости
 */

import 'reflect-metadata';

function Injectable() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return constructor;
  };
}

function Optional() {
  return function (target: any, _: any, index: number) {
    const optionals = Reflect.getMetadata('optional:params', target) || [];
    optionals[index] = true;
    Reflect.defineMetadata('optional:params', optionals, target);
  };
}

class Container {
  private providers = new Map<any, any>();
  private instances = new Map<any, any>();

  provide<T>(token: any, provider: { new (...args: any[]): T }): void {
    this.providers.set(token, provider);
  }

  get<T>(token: any): T {
    if (this.instances.has(token)) return this.instances.get(token) as T;
    const Provider = this.providers.get(token);
    const paramTypes = Reflect.getMetadata('design:paramtypes', Provider) || [];
    const optionals = Reflect.getMetadata('optional:params', Provider) || [];
    const deps = paramTypes.map((t: any, i: number) => {
      if (optionals[i] && !this.providers.has(t)) return null;
      return this.get(t);
    });
    const instance = new Provider(...deps);
    this.instances.set(token, instance);
    return instance as T;
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
  constructor(
    private logger: LoggerService,
    @Optional() private cache?: any,
  ) {}

  getUser(id: number) {
    this.logger.log(`Getting user ${id}`);
    return this.cache ? `cached-${id}` : { id, name: 'User' };
  }
}

const container = new Container();
container.provide(LoggerService, LoggerService);
container.provide(UserService, UserService);

const userService = container.get<UserService>(UserService);
console.log(userService.getUser(1));
