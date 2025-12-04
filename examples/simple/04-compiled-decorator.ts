/**
 * Пример 4: Как TypeScript компилирует декораторы в JavaScript
 *
 * TypeScript декораторы - это синтаксический сахар над паттерном декоратора.
 * Давайте посмотрим, как они компилируются в обычный JavaScript.
 *
 * Запустите: npm run compile:example
 * И посмотрите на сгенерированный .js файл
 */

// Декоратор метода в TypeScript
function logMethod(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Вызывается метод: ${propertyKey}`);
    const result = originalMethod.apply(this, args);
    console.log(`Результат: ${result}`);
    return result;
  };

  return descriptor;
}

// Декоратор класса в TypeScript
function logClass(constructor: Function) {
  console.log("Класс определён:", constructor.name);
}

@logClass
class ExampleClass {
  @logMethod
  calculate(a: number, b: number): number {
    return a * b;
  }
}

// Использование
const instance = new ExampleClass();
instance.calculate(5, 4);

/**
 * После компиляции TypeScript преобразует это в:
 *
 * var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
 *     var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
 *     if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
 *     else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
 *     return c > 3 && r && Object.defineProperty(target, key, r), r;
 * };
 *
 * var __metadata = (this && this.__metadata) || function (k, v) {
 *     if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
 * };
 *
 * var ExampleClass = (function () {
 *     function ExampleClass() {
 *     }
 *     ExampleClass.prototype.calculate = function (a, b) {
 *         return a * b;
 *     };
 *     __decorate([logMethod, __metadata("design:type", Function), __metadata("design:paramtypes", [Number, Number]), __metadata("design:returntype", Number)], ExampleClass.prototype, "calculate", null);
 *     ExampleClass = __decorate([logClass], ExampleClass);
 *     return ExampleClass;
 * }());
 */

