// 继承是指将特性从父代传递给子代，以便新代码可以重用并基于现有代码的特性进行构建

// JavaScript 使用对象实现继承。每个对象都有一条链接到另一个称作原型的对象的内部链。
// 该原型对象有自己的原型，依此类推，直到原型是 null 的对象
// null 没有原型

// 运行时可修改原型链的任何成员，可换掉原型

// JavaScript 继承的实现方式 是 原型机制，而 Python Java 等语言的继承实现方式则是类机制

// 继承属性
// JavaScript 对象有一条指向原型对象的链。当试图访问对象的属性时，不仅在该对象上查找属性，
// 还会在该对象的原型上查找属性，以及原型的原型，依此类推，直到找到一个名字匹配的属性或到达原型链的末尾
const o1 = {
  a: 1,
  b: 2,
  __proto__: {
    b: 3,
    c: 4,
  },
}
console.log(o1.a) // 1 自有属性
console.log(o1.b) // 2 自有属性
console.log(o1.c) // 4 原型属性
console.log(o1.d) // undefined 没有找到
// 查找属性
console.log(o1.hasOwnProperty('c')) // false
console.log(Object.hasOwn(o1, 'c')) // false
console.log(Object.getPrototypeOf(o1).hasOwnProperty('c') ) // true
console.log('c' in o1) // true
console.log(Object.keys(o1)) // [ 'a', 'b' ]
console.log(o1.__proto__) // { b: 3, c: 4 }
console.log(Object.getPrototypeOf(o1)) // { b: 3, c: 4 }
console.log(Object.getPrototypeOf(o1) === o1.__proto__) // true
// 给对象设置属性会创建自有属性。获取和设置行为规则的唯一例外是当它被 getter 或 setter 拦截时
Object.defineProperty(o1, 'b', {
  get: function () {
    return this.__proto__.b
  },
})
console.log(o1.b) // 3 从原型继承
// 原型链可以创建更长
console.log(o1.__proto__.__proto__) // [Object: null prototype] {}
console.log(o1.__proto__.__proto__.__proto__) // null

// 继承方法
const parent = {
  value: 2,
  method() {
    return this.value++
  },
}

console.log(parent.method()) // 2

const child = {
  __proto__: parent,
}
console.log('---------第一轮--------')
console.log(child) // {}
console.log(child.method()) // 3
console.log(child.value) // 4
console.log(child.__proto__.value) // 3
console.log(parent.value) // 3
// child.method() this 指向 child，child 继承的是 parent 的方法
// 在 child 上寻找属性 value，没有找到，会在其原型上找到，即 parent.value（3）
// 最后先返回 3，紧接着自增1，此时 child.value = 3 + 1 = 4
console.log('---------第二轮--------')
console.log(child) // { value: 4 }
console.log(child.method()) // 4
console.log(child.value) // 5
console.log(child.__proto__.value) // 3
console.log(parent.value) // 3
// 此时 child 拥有 value 属性，所以 this.value 指向 child.value(4)，而不是 parent.value(3)

// 原型的强大之处在于，如果一组属性应该出现在每一个实例上，那我们就可以复用它们——尤其是对于方法
// const boxes = [
//   { value: 1, getValue() { return this.value; } },
//   { value: 2, getValue() { return this.value; } },
//   { value: 3, getValue() { return this.value; } },
// ]
// 这是不优雅的，函数是相同的，只是 this 指向不同，冗余且不必要的
// 原型改造
// const boxPrototype = {
//   getValue() {
//     return this.value
//   },
// }

// const boxes = [
//   { __proto__: boxPrototype, value: 1 },
//   { __proto__: boxPrototype, value: 2 },
//   { __proto__: boxPrototype, value: 3 },
// ]
// 降低了内存使用率，但是为每个对象手动绑定 __proto__ 很麻烦，可以使用构造函数
function Box(value) {
  this.value = value
}
// 通过构造函数创建的每一个实例都会自动将构造函数的 prototype 属性作为其 [[Prototype]]
Box.prototype.getValue = function () {
  return this.value
}
const boxes = [new Box(1), new Box(2), new Box(3)]
// box --> Box.prototype --> Object.prototype --> null
console.log('验证开始000')
console.log(boxes[0].__proto__ === Box.prototype)
console.log(Box.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)
console.log('验证结束000')


// 创建实例，实例的原型将用 prototype，实例继承父类，其属性是__proto__
// Constructor.prototype 默认具有一个自有属性：constructor，引用构造函数本身
console.log(Box.prototype.constructor === Box)
// 这允许我们在任何实例中访问原始构造函数
console.log(new Box(1).__proto__.constructor === Box)

// 用类
class NewBox {
  constructor(value) {
    this.value = value
  }
  // 在 NewBox.prototype 上创建方法
  getValue() {
    return this.value
  }
}
let box1 = new NewBox(1)
console.log(box1.getValue())  // 1
NewBox.prototype.getValue = function () {
  return this.value + 1
}
console.log(box1.getValue())  // 2
console.log(Object.getPrototypeOf(NewBox) === Function.prototype) // true


class Rectangle {
  constructor(height, width) {
    this.name = "Rectangle";
    this.height = height;
    this.width = width;
  }
}

class FilledRectangle extends Rectangle {
  constructor(height, width, color) {
    super(height, width);
    this.name = "Filled rectangle";
    this.color = color;
  }
}

const filledRectangle = new FilledRectangle(5, 10, "blue");
// filledRectangle ---> FilledRectangle.prototype ---> Rectangle.prototype ---> Object.prototype ---> null
console.log('验证开始111')
console.log(filledRectangle.__proto__ === FilledRectangle.prototype)
console.log(FilledRectangle.prototype.__proto__ === Rectangle.prototype)
console.log(Rectangle.prototype.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)
console.log('验证结束111')



// 通过 Object.create() 方法，该对象的 [[Prototype]] 是该函数的第一个参数
const a = { a: 1 };
// a ---> Object.prototype ---> null
const b = Object.create(a);
// b ---> a ---> Object.prototype ---> null
console.log(b.a); // 1（继承的）
const c = Object.create(b);
// c ---> b ---> a ---> Object.prototype ---> null
const d = Object.create(null);
// d ---> null（d 是一个直接以 null 为原型的对象）
console.log(d.hasOwnProperty);
// undefined，因为 d 没有继承 Object.prototype
// c -> b -> a -> Object.prototype -> null
console.log('验证开始222')
console.log(c.__proto__ === b)
console.log(b.__proto__ === a)
console.log(a.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)
console.log('验证结束222')

// Object.setPrototypeOf() 允许修改现有对象的 [[Prototype]] 内部属性
// 能强制为 Object.create(null) 创建的无原型的对象设置原型
const rawObj = { a: 1 };
const anotherObj = { b: 2 };
Object.setPrototypeOf(rawObj, anotherObj)
console.log(rawObj.b)  // 2
// rawObj ---> anotherObj ---> Object.prototype ---> null
console.log('验证开始333')
console.log(rawObj.__proto__ === anotherObj)
console.log(anotherObj.__proto__ === Object.prototype)
console.log(Object.prototype.__proto__ === null)
console.log('验证结束333')


const noWell = {};
// 请不要使用该方法：仅作为示例。
noWell.__proto__ = { barProp: "bar val" };
noWell.__proto__.__proto__ = { fooProp: "foo val" };
console.log(noWell.fooProp);
console.log(noWell.barProp);

// 通常建议使用 ES6 中的 Reflect.getPrototypeOf() 或者 Object.getPrototypeOf()
// Reflect.setPrototypeOf() 或者 Object.setPrototypeOf()

// 原型污染：攻击者通过某种手段修改 JavaScript 对象的原型。
Object.prototype.toString = function () {  return console.log('桀桀桀') }
console.log({}.toString())  // 桀桀桀 undefined
// 1.使用 Object.create(null)， 方法创建一个原型为 null 的新对象，这样无论对 原型做怎样的扩展都不会生效
// 2.使用 Object.freeze(obj) 冻结指定对象，使之不能被修改属性，成为不可扩展对象
// 3.建立 JSON schema ，在解析用户输入内容时，通过 JSON schema 过滤敏感键名
// 4.规避不安全的递归性合并。这一点类似 lodash 修复手段，完善了合并操作的安全性，对敏感键名跳过处理