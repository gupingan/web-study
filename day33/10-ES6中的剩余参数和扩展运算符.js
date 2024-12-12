// 剩余参数允许我们将不确定数量的剩余的元素放到一个数组中
// 传统
function fn(a, b, c) {
  console.log(a, b, c)
}

fn(1, 2) // 1 2 undefined
fn(1, 2, 3) // 1 2 3
fn(1, 2, 3, 4) // 1 2 3
// ES6
fn = function (...args) {
  console.log(...args)
}

fn(1, 2) // 1 2
fn(1, 2, 3) // 1 2 3
fn(1, 2, 3, 4) // 1 2 3 4

// 扩展运算符
// 将数组或者对象拆分成逗号分隔的参数序列
// 比如上方的 console.log(...args) args 经剩余参数得到的是数组，使用时使用 ... 拆分了
// 也就是一个打包，一个拆分的作用
// 可以浅拷贝数组
let arr1 = ['苍狼', '神龙', '天虎', {}]
let arr2 = [...arr1]
console.log(arr1 === arr2)  // false
console.log(arr1[3] === arr2[3])  // true
// 合并数组
let arr3 = [...arr1, ...arr2]
console.log(arr3)
// 将类数组或者可迭代对象转为数组  作用同理 Array.from(arrayLike)
function fn2() {
  console.log(arguments)
  console.log([...arguments])
}

fn2(1, 2, 3, 4, 5)
// 合并对象 也可以拷贝
let obj1 = {
  name: '顾平安',
  age: 32
}
let obj2 = {
  age: 18,
  gender: '男'
}
console.log({
  ...obj1,
  ...obj2
})  // { name: '顾平安', age: 18, gender: '男' }