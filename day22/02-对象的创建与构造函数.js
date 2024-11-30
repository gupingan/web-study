// 创建自定义对象的方法
// 1. 对象字面量 {}
// 键：属性面 值：属性值（可以是任意类型的值）
let obj1 = {
  name: '顾平安',
  gender: '男',
  age: 23,
  // 还可以放置嵌套的对象
  wife: {
    name: '小吴',
    gender: '女',
    age: 22,
  },
  // 还可以增加方法，可通过 obj1.show() 调用
  show: function () {
    console.log(`我的名字叫做${this.name}，我的老婆叫做${this.wife.name}`)
  },
}
// console.log(obj1)
// console.log(obj1.wife)
obj1.show()

// 2. 工厂模式 new Object()
function createPerson(name, gender, age) {
  let obj = new Object()
  obj.name = name
  obj.gender = gender
  obj.age = age
  obj.show = function () {
    console.log(`我的名字叫做${this.name}`)
  }
  return obj
}
let obj2 = createPerson('猪八戒', '男', 32)
let obj3 = createPerson('孙悟空', '男', 508)
obj2.show()
console.log(obj3.gender)
// 使用工厂方法创建的对象，使用的构造函数都是 Object。所以创建的对象都是 Object 这个类型，就导致我们无法区分出多种不同类型的对象

// 3. 使用构造函数
function Student(name) {
  this.name = name
  this.show = function () {
    console.log(`我的名字叫做${this.name}`)
  }
}

let stu1 = new Student('张三')
let stu2 = new Student('李四')
stu1.show()
console.log(stu2.name)

// 构造函数：是一种特殊的函数，主要用来创建和初始化对象，也就是为对象的成员变量赋初始值。它与 new 一起使用才有意义
// 我们可以把对象中一些公共的属性和方法抽取出来，然后封装到这个构造函数里面

// 构造函数和普通函数的区别
// 构造函数的创建方式和普通函数没有区别，不同的是构造函数习惯上首字母大写。
// 构造函数和普通函数的区别就是调用方式的不同：普通函数是直接调用，而构造函数需要使用 new 关键字来调用
// this 的指向也有所不同，函数调用指向 window，方法调用指向调用的对象，构造函数调用执行新创建的对象

// new 一个构造函数的执行流程
// （1）开辟内存空间，在内存中创建一个新的空对象。
// （2）让 this 指向这个新的对象。
// （3）执行构造函数里面的代码，给这个新对象添加属性和方法。
// （4）返回这个新对象（所以构造函数里面不需要 return）。

// 静态成员和实例成员
// JavaScript 的构造函数中可以添加一些成员，可以在构造函数本身上添加，也可以在构造函数内部的 this 上添加。
// 通过这两种方式添加的成员，就分别称为静态成员和实例成员
// 静态成员：在构造函数本上添加的成员称为静态成员，只能由构造函数本身来访问。
// 实例成员：在构造函数内部创建的对象成员称为实例成员，只能由实例化的对象来访问。

// 类、实例
// 使用同一个构造函数创建的对象，我们称为一类对象，也将一个构造函数称为一个类
// 通过一个构造函数创建的对象，称为该类的实例。

// instanceof
// 使用 instanceof 可以检查一个对象是否为一个类的实例
// 语法：对象 instanceof 构造函数
function Person() {}
function Dog() {}
let person1 = new Person()
let dog1 = new Dog()
console.log(person1 instanceof Person)
console.log(person1 instanceof Dog)
console.log(typeof dog1)
console.log(person1 instanceof Object)


// json 的介绍
// 对象字面量和 json 比较像，JavaScript Object Notation（JavaScript 对象表示形式）
// JSON 和对象字面量的区别：JSON 的属性必须用双引号引号引起来，对象字面量可以省略
/* 
{
    "name" : "小丑王",
    "age" : 18,
    "sex" : true,
};
*/
// 注：json 里一般放常量、数组、对象等，但很少放 function
// 对象 和 json 没有长度，对象.length 的打印结果是 undefined，自然也就不能用 for 循环遍历
let myJson = {
  "name": '小丑王',
  "age": 18,
  "sex": true,
}

for (let key in myJson) {
  console.log(key, myJson[key])
}