// 输出什么
console.log(Object.prototype.__proto__) // null
console.log(Function.prototype.__proto__) // Object.prototype
console.log(Object.__proto__) // Function.prototype

/* 
按照如下要求实现Person 和 Student 对象
 a)Student 继承 Person 
 b)Person 包含一个实例变量 name， 包含一个方法 printName
 c)Student 包含一个实例变量 score， 包含一个实例方法printScore
 d)所有Person和Student对象之间共享一个方法
 */
// stu -> Student.prototype -> Person.prototype -> Object.prototype
// 原生写法
// function Person(name) {
//   this.name = name
// }
// Person.prototype.printName = function () {
//   console.log(this.name)
// }
// Person.prototype.commonMethod = function () {
//   console.log('common method')
// }
// function Student(name, score) {
//   Person.call(this, name)
//   this.score = score
// }

// Student.prototype = Object.create(Person.prototype)
// Student.prototype.constructor = Student

// Student.prototype.printScore = function () {
//   console.log(this.score)
// }

// ES6写法
class Person {
  constructor(name) {
    this.name = name
  }
  printName() {
    console.log(this.name)
  }

  commmonMethod() {
    console.log('common method')
  }
}

class Student extends Person {
  constructor(name, score) {
    super(name)
    this.score = score
  }
  printScore() {
    console.log(this.score)
  }
}


// 问题一：原型 (prototype) 是什么 ?
// Javascript 中类继承是通过原型模式实现的，何为原型？原型就是某个对象的内部属性[[Prototype]]，也是实现继承和属性共享的机制中
// 重要的一环。 特别是对象之间的原型链关系，可以通过某个子对象访问其父对象的属性方法，因为[[Prototype]]无法被直接被访问，
// 因此引擎提供了 __proto__属性可供访问，该属性并非 ES 规范，但是很多浏览器都支持它。一个对象的原型通常源于构造函数的实例原型
//  prototype 对象，按照 ECMAScript 规范，实际上某个对象原型获取建议使用 Object.getPrototypeOf() 方法

// 问题二：[[Prototype]] 又是什么? 和 __proto__ 的差别是什么?
// [[Prototype]]是对象的属性，指向该对象的原型对象，包含了该对象所继承的属性和方法。__proto__ 是非ES5标准但大多数浏览器可供
// 访问的属性，通过该属性可以读取该对象的原型对象。[[Prototype]]无法被正常读取，而JS引擎提供的 __proto__ 属性可以读取到原型对象
// 根据 ES5 规范，推荐使用 Object.getPrototypeOf() 方法读取某个对象的原型

// 问题三：__proto__ 属性和 prototype 属性的差别是什么?
// __proto__ 是非 ES5 标准并由 JS 引擎提供访问对象的原型对象的属性，它是对象的属性。
// prototype 是 ES5 标准的属性，它通常定义在构造函数上，构造函数实例化出某个对象时，该对象的原型 __proto__ 属性指向该值
// 另外，__proto__ 通常是实例的属性，而 prototype 是构造函数的属性，prototype 这个属性中还有 constructor 属性，正式构造函数自身
// 而 __proto__ 这个属性中并没有 constructor 属性

// 问题四：原型链 (prototype chain) 是什么 ?
// 为了让对象之间能够实现继承关系，共享属性和方法，JS 中引入了原型链，当对象的链接到另一个称为原型的对象时，我们在最下级的对象
// 访问某个属性或者方法时，如果该对象自有的属性和方法中没有，那么就会沿着原型链找到上层原型，如果没找到，重复查找，直到达到原型
// 链末端为止。原型链的末端为 null，次级一些就是 Object.prototype 对象。这样的一条路径的其实就是原型链

// 问题五：什么是原型继承 (Prototypal inheritance)?
// 为了表达类的多样性，比如某个父类其下还有多个子类，在 JS 中无需重复实现相同的方法属性，而是通过原型链使子类能够继承父类的属性方法
// 同时，还能表现出自身不一样的属性和方法，呈现出多态的感觉，子类通过原型共享父类的一些属性和方法的这个过程就是原型继承，更确切的表述
// 就是通过原型链使子类能够继承父类的方法