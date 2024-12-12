// 解构赋值语法是一种 Javascript 表达式。可以将数组中的值或对象的属性取出，赋值给其他变量。

// 数组的解构赋值
// 少匹配多 可一一匹配或者打包剩余的元素
var x = [1, 2, 3, 4, 5]
var [y, z] = x
console.log(y) // 1
console.log(z) // 2
var [,y,,z] = x  // 可间隔分配
console.log(y) // 2
console.log(z) // 4
var [y, j, ...z] = x // 剩余属性 ...rest 只能放在最后一个，其后方不能有逗号
console.log(y) // 1
console.log(j) // 2
console.log(z) // [3, 4, 5]

// 多匹配少 多的分配为 undefined
var [y, z] = [6]
console.log(y) // 6
console.log(z) // undefined

// 默认值 当属性不存在或值为 undefined 时，将使用默认值
var [y = 1, z = 2] = [6] // 默认值
console.log(y) // 6  有分配值就不管默认值
console.log(z) // 2  由于分配得到 undefined，所以结果是默认值
var [y = 1, z = 2] = [6, undefined] // 同理
console.log(y) // 6
console.log(z) // 2



// 对象的解构赋值
const person = { name: '顾平安', age: 24, sex: '男' }
var { name, age, sex } = person
console.log(name)
console.log(age)
console.log(sex)

// 少匹配多 一一对应，或者打包剩余属性
var { name, age } = person
console.log(name)  // 顾平安
console.log(age) // 24

var { name, ...info } = person
console.log(name)  // 顾平安
console.log(info) // { age: 24, sex: '男' }

// 多匹配少 多的分配为 undefined
var { name, age, sex, score } = person
console.log(score) // undefined

// 默认值
var { name, age, sex, score=99 } = person
console.log(score) // 99

// 别名
var {name: Name, age: Age} = person
console.log(Name, Age)  // 顾平安 24

// 圆括号
// 如果解构赋值(对象解构赋值)之前，左边接收的变量已被提前定义了，此时解构表达式需要使用()包着
let a = 1;
({a} = {a: [1, 2, 3]});
console.log(a)  // [ 1, 2, 3 ]

// 字符串解构赋值
let str1 = 'hello 世界'
var [y, ...b] = str1
console.log(y, b) // h [
//   'e',  'l', 'l',
//   'o',  ' ', '世',
//   '界'
// ]

// 函数的返回值
function test1() {
  return [1, 2]
}

var [,t] = test1()
console.log(t)  // 2

// 函数的参数
function test2([, t]) {
  console.log(t)
}

test2([1, 2, 3])  // 2