// 闭包：如果外部作用域有权访问另外一个函数内部的局部变量时，那就产生了闭包。这个内部函数称之为闭包函数。注意，这里强调的是访问局部变量
function fun1() {
  const a = 10
  return function fun2() {
    console.log(a)
  }
}

fun1()

const result = fun1()
result() // 10
// 外部作用域（即全局作用域） 访问了函数 fun1 中的局部变量，那么，在 fun1 中就产生了闭包，函数 fun1是闭包函数
// 注意，闭包函数是fun1，不是fun2。fun2在这里的作用是让全局作用域访问到变量a，fun2只是一个桥梁

// 闭包的生命周期
// 产生：内部函数fun2被声明时（即被创建时，不是被调用时）就产生了。
// 死亡：嵌套的内部函数成为垃圾对象时。（比如result = null，就可以回收闭包）

// 闭包的表现形式
// 形式1：将一个函数作为另一个函数的返回值
function fn1() {
  var a = 2

  function fn2() {
    a++
    console.log(a)
  }
  return fn2
}

var f = fn1() //执行外部函数fn1，返回的是内部函数fn2
f() // 3       //执行fn2
f() // 4       //再次执行fn2
// 形式2：将函数作为实参传递给另一个函数调用
function showDelay(msg, time) {
  setTimeout(function () {
    //引用了外部函数的变量msg
    console.log(msg)
  }, time)
}
showDelay('顾平安', 2000)

// 闭包的作用
// 作用1：延长局部变量的生命周期。
// 作用2：让函数外部可以操作（读写）函数内部的数据（变量/函数）。

// 闭包的应用场景
// 场景1：高阶函数
// 题目：不同的班级有不同成绩检测标准。比如：A班的合格线是60分，B 班的合格线是70分。
// 已知某个人班级和分数，请用闭包函数判断他的成绩是否合格。
// 思路：创建成绩检测函数 checkStandard(n)，检查成绩 n 是否合格，函数返回布尔值。
function createCheckTemp(standard) {
  return function checkStandard(n) {
    if (n >= standard) console.log('成绩合格')
    else console.log('成绩不合格')
  }
}

let checkOfA = createCheckTemp(60)
let checkOfB = createCheckTemp(70)
checkOfA(75)
checkOfB(65)

// 场景2：封装JS模块
// 定义具有特定功能的JS模块，将所有的数据和功能都封装在一个函数内部，只向外暴露指定的对象或方法。模块的调用者，只能调用模块暴露的对象或方法来实现对应的功能。
// 需求：定义一个私有变量a，要求a只能被进行指定操作（加减），不能进行其他操作（乘除）。
// 在 Java、C++ 等语言中，有私有属性的概念，但在JS中只能通过闭包模拟。
function createCounter() {
  let a = 0
  return {
    add: function () {
      a++
    },
    sub: function () {
      a--
    },
    get: function () {
      return a
    },
  }
}

let counter = createCounter()
counter.add()
counter.sub()
counter.add()
console.log(counter.get())

// 内存泄露和内存溢出
// 内存泄漏：占用的内存没有及时释放
// 内存泄露的次数积累多了，就容易导致内存溢出

// 常见的内存泄露：
// 1、意外的全局变量
// function fn() {
//   a = new Array(10000000)
//   console.log(a)
// }
// fn()
// 2、没有及时清理的计时器或回调函数
// var intervalId = setInterval(function () {
//   //启动循环定时器后不清理
//   console.log('----')
// }, 1000)
// clearInterval(intervalId)
// 3、闭包
// function fn1() {
//   var a = 4;
//   function fn2() {
//     console.log(++a)
//   }
//   return fn2
// }
// var f = fn1()
// f()
// f = null //让内部函数成为垃圾对象-->回收闭包

// 内存溢出：程序运行时出现的错误。当程序运行需要的内存超过剩余的内存时，就抛出内存溢出的错误
// var obj = {};
// for (var i = 0; i < 10000; i++) {
//   obj[i] = new Array(10000000);  //把所有的数组内容都放到obj里保存，导致obj占用了很大的内存空间
//   console.log("-----");
// }

// 闭包是否会造成内存泄漏？
// 一般来说，答案是否定的。因为内存泄漏是非预期情况，本来想回收，但实际没回收；而闭包是预期情况，一般不会造成内存泄漏。


// 闭包面试题
function addCount() {
  let count = 0
  return function () {
    count = count + 1
    console.log(count)
  }
}

const fun11 = addCount()
const fun22 = addCount()
fun11()  // 1
fun22()  // 1

fun11()  // 2
fun22()  // 2