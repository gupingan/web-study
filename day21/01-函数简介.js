// 函数：一些功能或语句的封装。通过调用的形式执行这些功能或者语句
// 函数也是对象
// 使用 typeof 检查函数对象时，返回 function
// 作用：一次定义，多次调用，简化代码，让编程模块化，高内聚，低耦合

// 函数定义/声明
// 1. 命名函数
/* 
function 函数名([形参1, 形参2, ...形参n]) {
    函数体
}
*/
function add1(a, b) {
  return a + b
}

// 2. 函数表达式——匿名函数
const add2 = function (a, b) {
  return a + b
}

// 3. 构造函数
const add3 = new Function('a', 'b', 'return a+b')

// 函数调用
// 1. 普通函数的调用
console.log(add1(1, 2)) // 3
console.log(add2(1, 2)) // 3
console.log(add3(1, 2)) // 3
console.log(add1.call(null, 1, 2))
console.log(add2.call(null, 1, 2))
console.log(add3.call(null, 1, 2))

// 2. 通过对象的方法调用
let person1 = {
  name: '顾平安',
  sayHello: function () {
    console.log('Hi, 我是' + this.name + '!')
  },
}
person1.sayHello()

// 3. 立即执行函数
;(function () {
  console.log('立即执行')
})()
// 定义即调用

// 4. 通过构造函数来调用
function sayBye() {
  console.log('Bye!')
}

new sayBye() // Bye!

// 5.绑定事件函数
// 当前是 node.js 环境，无法测试，这里只是展示语法
// var btn = document.getElementById('btn')
// btn.onclick = function () {
//   alert('Hello world')
// }

// 6. 定时器函数
// let num = 1
// let timer = setInterval(function () {
//   console.log(num++)
//   if (num >= 5) clearInterval(timer)
// }, 1000)

// 函数的参数：形参和实参
// 形参是函数内的一些待定值。在调用函数时，需传入这些参数的具体值（即实参）
// a, b 是形参，表示待定值
function add(a, b) {
  const sum = a + b
  console.log(sum)
}

// 1, 2 是实参，表示传入的具体值。调用函数时，传入实参
add(1, 2)

// 形参：形式上的参数，定义函数时传递的特定值，相当于在函数内部声明的变量，并不赋值，形参的默认值是 undefined
// 实参：实际上的参数，调用函数时传递的具体值，实参将传递给函数中对应的形参

// 如果实参个数 > 形参个数，则末尾的实参是多余的，不会被赋值，因为没有形参能接收它。
// 如果实参个数 < 形参个数，则末尾的形参是多余的，值是 undefined，因为它没有接收到实参。（undefined参与运算时，表达式的运算结果为NaN）
add() // undefined + undefined = NaN
add(1) // 1 + undefined = NaN
add('hi', ' world') // 'hi' + ' world' = 'hi world'
add(1, 2, 3) // 1 + 2 = 3
// 函数的实参可以是任意的数据类型。调用函数时，解析器不会检查实参类型，所以要注意，是否有可能会接收到非法的参数，如果有可能则需要对参数进行类型检查。

// 函数的返回值
// return 关键字
// 函数体内可以没有返回值，也可以根据需要加返回值。语法格式：return 函数的返回值
function add(a, b) {
  return a + b
}
// 作用：终止函数，返回值
add(1, 2) // 返回了，但是没有打印，啥也不做，没人承接这个值
console.log(add(1, 2)) // 返回值，并打印  3

// return 的返回值会作为函数运行的最终结果，后方的语句都不会执行
// return 不指定返回值或者无return的情况，函数返回值是 undefined
// return 返回值不限类型，表达式？变量？对象？值？都可以

// break continue return 区别
// break：结束当前循环（for、while）
// continue：跳出本次循环，如果可以继续下次循环（for、while）
// return：只能用于函数中，函数中，无论return在循环或者什么地方，立马结束当前的函数体运行，并返回值

// 函数名、函数体和函数加载问题☆☆☆
// 函数的加载问题：JS加载的时候，只加载函数名，不加载函数体。所以如果想使用内部的成员变量，需要调用函数
console.log(fn)
console.log(function fn() {
  console.log(1)
})

// fn() 调用函数，执行函数内部的功能
// fn 未调用函数，仅仅表明这是函数对象

//定义fn方法
function fn() {
  console.log(1)
}

// 方法
// 函数也可以成为对象的属性，如果一个函数是作为一个对象属性保存，那么，我们称这个函数是这个对象的方法
// 调用这个函数也就是说调用这个对象的方法。
// fn()
// obj.fn()
// 名称上区别，无其他区别



// 类数组对象 arguments
// 调用函数时，浏览器每次都会传递两个隐含的参数
// 函数的上下文对象 this
// 函数的参数 arguments
function foo() {
  console.log(arguments)
  console.log(typeof arguments)
}

foo('a', 1, 2)
// [Arguments] { '0': 'a', '1': 1, '2': 2 }
// object
// 函数内的 arguments 是一个类数组对象，里面存储的是它接收到的实参列表。
// 所有函数都内置了一个 arguments 对象，有个讲究的地方是：只有函数才有arguments。
// arguments 的展示形式是一个伪数组。意思是，它和数组有点像，但它并不是数组。它具有以下特点
// 可以进行遍历；具有数组的 length 属性，可以获取长度。
// 可以通过索引（从0开始计数）存储数据、获取和操作数据。比如，我们可以通过索引访问某个实参
// 不能调用数组的方法。比如push()、pop() 等方法都没有
function foo() {
  console.log(foo.length) // 形参个数
  console.log(arguments.length) // 3
  console.log(arguments[0]) // a
  console.log(arguments[1]) // 1
  console.log(arguments[2]) // 2
  // arguments.push(3) // 不能调用数组的方法
}

foo('a', 1, 2)
// 即使我们不定义形参，也可以通过 arguments 来获取实参

// 举例：将传入的实参进行求和，无论实参的个数有多少
function foo() {
  let sum = 0
  for (let i = 0; i < arguments.length; i++) {
    sum += arguments[i]
  }
  return sum
}

console.log(foo(1, 2, 3, 4, 5)) // 15

// arguments.callee 返回正在执行的函数
function foo() {
  console.log(arguments.callee) // [Function: foo]
  console.log(arguments.callee.arguments) // [Arguments] { '0': 1, '1': 2 }
}
foo(1, 2)

// arguments 可以修改元素
function foo() {
  arguments[0] = 100
  console.log(arguments[0])
}

foo(10)


// 当我们不确定有多少个参数传递的时候
function getMaxValue() {
  let max = arguments[0]
  for (let i = 1; i < arguments.length; i++) {
    if (arguments[i] > max) {
      max = arguments[i]
    }
  }
  return max
}

console.log(getMaxValue(1, 2, 3, 4, 5))
// console.log(getMaxValue.call(this, 1, 2, 3, 4, 5))