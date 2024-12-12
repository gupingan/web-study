// Es5 中为 Object 扩展了一些静态方法，常用两种
// Object.create(prototype, [descriptors])  以现有对象为原型，创建一个新对象
let uInfo = {
  username: 'gupingan',
  password: '12345678',
}
let uCommon = {
  sign: 'aabbccddef',
}

let u1 = Object.create(uInfo)
console.log(u1.__proto__)

let u2 = Object.create(uCommon, {
  username: {
    value: 'gupingna',
    writable: true,
    configurable: true,
    enumerable: true,
  },
  password: {
    value: '12345678',
    writable: false,
    configurable: true,
    enumerable: true,
  },
})
console.log(u2)
console.log(u2.__proto__)

// Object.defineProperties(object, descriptors) 在一个对象上定义新的属性或者修改现有属性，并返回该对象
const object1 = {}

Object.defineProperties(object1, {
  property1: {
    value: 42,
    writable: true,
  },
  property2: {},
})

console.log(object1.property1)
console.log(Object.getOwnPropertyDescriptor(object1, 'property1'))
console.log(Object.getOwnPropertyDescriptor(object1, 'property2'))

// 对象属性可分为两大类：数据描述符和访问器描述符
// 数据描述符具有以下属性：
// value          值
// writable       是否可写
// configurable   是否可删除、可修改为访问器、可修改其特性
// enumerable     是否可枚举
// 访问器描述符具有以下属性：
// get            为 getter 提供方法，属性被访问时调用该方法，如果没有方法返回 undefined，传入 this 对象
// set            为 setter 提供方法，设置新的属性值时调用该方法，传入参数即新值
// configurable   是否可删除、可修改为访问器、可修改其枚举特性、可修改其属性值
// enumerable     是否可枚举
const obj3 = {}
Object.defineProperty(obj3, 'name', {
  value: 'gupingan',
  writable: true,
  configurable: false,
  enumerable: false
})
console.log(obj3.name)

delete obj3.name
console.log(obj3.name)


const obj4 = {
  firstName: 'Pingan',
  lastName: 'Gu',
  get fullName() {
    return this.firstName + ' ' + this.lastName
  }
}
obj4.fullName = 123  // 写入失败，上方未设置属性的set属性
console.log(obj4.fullName)

Object.defineProperty(obj4, 'fullName', {
  set: function (newName) {
    let [firstName, lastName] = newName.toString().split(' ')
    this.firstName = firstName
    this.lastName = lastName
  }
})

obj4.fullName = 'Wu Jinrong'  // 写入成功，对象中的 fullName 已经提供了 set 属性
console.log(obj4.fullName)