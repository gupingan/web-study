// 当前 JS 文件并非指 nodejs 环境，只是为了方便复习
// ES5 中，使用 var 定义变量
// ES6 中，新增了 let const 定义变量
// let：定义变量，代替 var
// const：定义常量，定义后不可修改

// var 定义变量
{
  var a = 1
}
console.log(a)

// 因为var是全局声明的，函数作用域和全局作用域可局限，块级不行
// var 不具备块级作用域特性
{
  let b = 2
}
// console.log(b)  // 报错，b未定义
// let 具备块级作用域的特性，const 同理可验证
{
  let a = 100
}
console.log(a) // 因为上方的let a = 100具备块级作用域特性，因此这外面的 a 和它无关，打印之前定义时的值 1
// let 可以防止数据污染

// 面试题：
for (var i = 0; i < 10; i++) {
  console.log('循环体中:' + i) // 0 到 9打印出来
}

console.log('循环体外:' + i) // var 的原因，每次循环产生块级作用域，这里的 i 是 10

// const 常量
const o = {
  a: 199,
}

// o = {
//   a: 200
// } // 报错，不能修改指向

o.a = 200 // 可修改，引用类型，通过引用直接改掉堆内存中的值

console.log(o)

// let 和 const 的特点
// 不属于顶层对象 Window
// 不允许重复声明
// 不存在变量提升
// 存在暂时性死区
// 支持块级作用域

// var 的特点
// 属于顶层对象
// 可以重复声明
// 存在变量提升
// 不存在暂时性死区
// 支持函数作用域

// var、let、const 共同点
// 全局作用域中定义的变量，可以在函数中使用
// 函数中声明的变量，只能在函数及其子函数中使用，外部无法使用
let arr = []

for (var i = 0; i < 5; i++) {
  arr.push(function () {
    console.log(i)
  })
}

for (let j = 0; j < 5; j++) {
  arr[j]()
}
// 打印的应该是 5 5 5 5 5  为什么呢？因为 var 支持函数作用域，但是不支持块级作用域
// var i = 0, i < 5， 最终的 i 值是 5，函数仅仅打印的是同一个 i
// 如果 var 改成 let，将会打印 0、1、2、3、4
arr = []
for (let i = 0; i < 5; i++) {
  arr.push(function () {
    console.log(i)
  })
}

for (let j = 0; j < 5; j++) {
  arr[j]()
}

// 什么是暂时性死区？
// 暂时性死区 TDZ —— 一种机制，也是一种区域
// 使用 let/const 声明的变量，会使区块形成封闭的作用域。若在声明之前使用变量，就会报错
// 总之，在代码块内，使用let命令声明变量之前，该变量都是不可用的


// ES5 中如何定义常量？Object.defineProperty
let window = globalThis // 环境原因，暂时使用 globalThis 假设 window
Object.defineProperty(window, 'PI', {
  value: 3.14159,
  writable: false
})
PI = 3.14
console.log(PI)
