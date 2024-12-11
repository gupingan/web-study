// Object 是所有对象的父级对象
// 对于 Object 构造函数，如果传入的是：
// 1. null或者undefined 返回 空对象
let obj1 = new Object(null)
let obj2 = new Object(undefined)
console.log(obj1, obj2)
// 2. 基本类型的值，则会构造其包装类型的对象
let obj3 = new Object(100)
console.log(obj3)
// 3. 引用类型的值，则会返回这值本身（同引用）
let obj4 = new Object(obj3)
console.log(obj4)
console.log(obj3 === obj4)

// 属性描述符（对象属性）
// 用于描述对象的值，控制其行为，是否可写可读可修改可枚举等的内部数据结构。
// 每个属性都有自己对应的属性描述符，保存该属性的元信息
// 两种形式：数据描述符（数据属性）和存储描述符（访问器属性）
// 数据描述符（数据属性）：具有属性的值，值可写不确定
// 1.value          通过属性的 get 访问获取值。可以是任意的 JavaScript 值，默认为 undefined
// 2.writable       表示属性是否可以通过赋值进行修改，默认为 false
// 3.configurable   表示属性是否可以删除，是否可以更改为访问器属性，以及是否可以更改其特性，默认为 false
// 4.enumerable     表示属性是否可以通过 for...in 循环进行枚举，默认为 false
// 存储描述符（访问器属性）：由getter和setter函数对描述的属性
// 1.get            给属性提供 getter 的方法，如果没有getter则为undefined。属性被访问时执行该方法，无参数传入，但传入this对象
// 2.set            给属性提供 setter 的方法，如果没有setter则为undefined。属性值被修改时执行该方法，传入新的属性值
// 3.configurable   表示属性是否可以删除，是否可以更改为访问器属性，以及是否可以更改其特性，默认为 false
// 4.enumerable     表示属性是否可以通过 for...in 循环进行枚举，默认为 false

// 获取属性描述符
// Object.getOwnPropertyDescriptor(obj, prop)
let obj5 = {
  name: 'zhangsan',
  age: 18,
}
let obj5Result = Object.getOwnPropertyDescriptor(obj5, 'name')
console.log(obj5Result)
/* 
{
  value: 'zhangsan',
  writable: true,
  enumerable: true,
  configurable: true
}
*/

// 设置数据描述符
// 定义至少一个属性：Object.defineProperties(obj, props)
let obj6 = {
  name: 'zhangsan',
  gender: 'male',
}
Object.defineProperties(obj6, {
  name: {
    value: '张三',
    configurable: true,
    enumerable: false,
    /*
    循环遍历语句遍历对象的属性有三种方式，如下所示，enumerable 影响下方的代码：
    1. for...in 语句：遍历该对象的可枚举属性
    2. Object.keys() 方法：该方法返回一个数组，该数组包含了该对象中所有自有可枚举的属性名称。
    3. Object.getOwnPropertyNames() 方法：该方法返回一个数组，该数组包含了该对象中所有属性名称。
    */
  },
  age: {
    // 新创建的属性，它的属性描述符将采用默认值，而不是 true
    value: 32,
  },
})
console.log(Object.getOwnPropertyDescriptor(obj6, 'name'))
console.log(Object.getOwnPropertyDescriptor(obj6, 'age'))
for (const key in obj6) {
  console.log(obj6[key]) // male
}
console.log(obj6) // { gender: 'male' }，其它属性不可枚举的原因

// 定义单个属性：Object.defineProperty(obj, prop, desc)
Object.defineProperty(obj6, 'hobby', {
  value: '吃饭睡觉打飞机',
  enumerable: true,
})

Object.defineProperty(obj6, 'sayHi', {
  value: function () {
    console.log(this.name + ': hi!')
  },
  enumerable: true,
})
obj6['hobby'] = '睡觉吃饭打虫虫' // 更改无效
console.log(obj6) // { gender: 'male', hobby: '吃饭睡觉打飞机', sayHi: [Function: value] }
obj6.sayHi() // 张三: hi!

// 设置存储描述符
// get()获取属性值，无参数，this 指向当前对象，this中不可访问当前设置的属性
// set()修改属性值，接受唯一参数新值
let hStr = '江南 Style'
let obj7 = {}
Object.defineProperty(obj7, 'name', {
  // value: hStr,
  // writable: true,
  // 不能同时设置数据描述符和存储描述符，互斥的，会导致 TypeError
  get: function () {
    return hStr
  },
  set: function (nV) {
    hStr = nV
  },
})
console.log(obj7.name)  // 江南 Style
obj7.name = '西风'
console.log(obj7.name)  // 西风
// 其实还能这样写
let obj8 = {
  get name() {
    return hStr
  },
  set name(newValue) {
    hStr = newValue
  }
}
console.log(obj8.name) // 西风
obj8.name = '玛卡巴卡'
console.log(obj8.name)  // 玛卡巴卡
 

// 防篡改对象
// ES5 中，新增了放置防篡改对象的属性或方法的机制，提供了三种保护方式：
// 1. 禁止扩展  禁止为对象新增属性或方法
// 2. 密封对象  禁止新增属性或方法，禁止配置现有的属性或方法的描述符(writable 除外)，仅允许读写属性的值
// 3. 冻结对象  禁止对对象执行任何修改的操作
// 一旦定义防篡改对象，无法撤销，无法改回

// 1. 禁止扩展  preventExtensions  禁止增加属性 + 原型不能更改，严格模式下会抛出 TypeError，非严格模式静默失败
console.log('-------------禁止扩展------------')
let obj9 = {name : '黑寡妇'}
Object.preventExtensions(obj9)
obj9.age = 18
console.log(obj9)  // { name: '黑寡妇' } 说明不可添加
obj9.name = '美羊羊'
console.log(obj9)  // { name: '美羊羊' } 说明可修改
Object.defineProperty(obj9, 'name', {enumerable: false})
console.log(obj9) // {} 说明可配置 enumerable
console.log(obj9.name)  // 美羊羊
delete obj9.name
console.log(obj9.name)  // undefined 说明可删除
// Object.defineProperty(obj9, 'age', {value: 18})  // 异常：TypeError: Cannot define property age, object is not extensible
// 可通过 Object.isExtensible(obj9) 来判断对象是否可扩展
console.log(Object.isExtensible(obj9)) // false

// 2. 密封对象  seal  禁止扩展 + 不能删除现有属性 + 不能更改可枚举性与可配置性
console.log('-------------密封对象------------')
let obj10 = {name : '黑寡妇'}
Object.seal(obj10)
obj10.age = 18
console.log(obj10)  // { name: '黑寡妇' } 说明不可添加
// Object.defineProperty(obj10, 'name', {
//   enumerable: false
// }) // 异常：TypeError: Cannot redefine property: name
// console.log(obj10)  // 说明不可配置 enumerable
obj10.name = '阿里嘎多美羊羊桑'
console.log(obj10)  // { name: '阿里嘎多美羊羊桑' } 说明可读写
delete obj10.name
console.log(obj10.name)  // 阿里嘎多美羊羊桑，说明不可删除
Object.defineProperty(obj10, 'name', {
  writable: false
})
console.log(Object.getOwnPropertyDescriptor(obj10, 'name'))  // 说明可配置 writable
// 可通过 Object.isSealed(obj10) 来判断对象是否密封
console.log(Object.isSealed(obj10))  // true

// 3. 冻结对象  freeze  密封 + 不可写入  静默失败或异常
console.log('-------------冻结对象------------')
let obj11 = {name : '黑寡妇'}
Object.freeze(obj11)
obj11.age = 18
console.log(obj11)  // { name: '黑寡妇' } 说明不可添加
obj11.name = '最佳舔狗沸羊羊桑'
console.log(obj11)  // { name: '黑寡妇' } 说明不可读写
// Object.defineProperty(obj11, 'name', {
//   enumerable: false
// }) // 异常：TypeError: Cannot redefine property: name
// console.log(obj11)  // 说明不可配置 enumerable
// Object.defineProperty(obj11, 'name', {
//   writable: true
// }) // 异常：TypeError: Cannot redefine property: name
// console.log(obj11)  // 说明不可配置 writable 为 true
delete obj11.name
console.log(obj11.name)  // 黑寡妇，说明不可删除
// 可通过 Object.isFrozen(obj10) 来判断对象是否冻结
console.log(Object.isFrozen(obj11))  // true

