/**
 * Пример 5: Singleton vs Transient зависимости
 */

import 'reflect-metadata';

enum Scope {
  Singleton = 'singleton',
  Transient = 'transient',
}

function Injectable(scope: Scope = Scope.Singleton) {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    Reflect.defineMetadata('scope', scope, constructor);
    return constructor;
  };
}

class Container {
  private providers = new Map<any, any>();
  private singletons = new Map<any, any>();

  provide<T>(token: any, provider: { new (...args: any[]): T }): void {
    this.providers.set(token, provider);
  }

  get<T>(token: any): T {
    const Provider = this.providers.get(token);
    const scope = Reflect.getMetadata('scope', Provider) || Scope.Singleton;
    if (scope === Scope.Singleton) {
      if (this.singletons.has(token)) return this.singletons.get(token) as T;
      const instance = this.createInstance<T>(Provider);
      this.singletons.set(token, instance);
      return instance;
    }
    return this.createInstance<T>(Provider);
  }

  private createInstance<T>(Provider: { new (...args: any[]): T }): T {
    const paramTypes = Reflect.getMetadata('design:paramtypes', Provider) || [];
    const deps = paramTypes.map((t: any) => this.get(t));
    return new Provider(...deps) as T;
  }
}

@Injectable(Scope.Singleton)
class ConfigService {
  private id = Math.random().toString(36).substring(7);
  getId() {
    return this.id;
  }
}

@Injectable(Scope.Transient)
class RequestService {
  private id = Math.random().toString(36).substring(7);
  getId() {
    return this.id;
  }
}

const container = new Container();
container.provide(ConfigService, ConfigService);
container.provide(RequestService, RequestService);

const c1 = container.get<ConfigService>(ConfigService);
const c2 = container.get<ConfigService>(ConfigService);
const r1 = container.get<RequestService>(RequestService);
const r2 = container.get<RequestService>(RequestService);

console.log('Singleton:', c1.getId() === c2.getId());
console.log('Transient:', r1.getId() !== r2.getId());
