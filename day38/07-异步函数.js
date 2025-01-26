// 使用async关键字声明的函数，称之为异步函数。在普通函数前面加上 async 关键字，就成了异步函数

// 写法1：函数声明的写法
async function foo1() {}

// 写法2：表达式写法（ES5语法）
const foo2 = async function () {}

// 写法3：表达式写法（ES6箭头函数语法）
const foo3 = async () => {}

// 写法4：定义一个类，在类中添加一个异步函数
class Person {
  async foo4() {}
}

// 异步函数的返回值永远是 Promise 对象。至于这个 Promise 后续会进入什么状态，那就要看情况了。主要有以下几种情况：
// 情况1：如果异步函数内部返回的是普通值（包括 return undefined时）或者普通对象，那么Promise 的状态为fulfilled。这个值会作为then()回调的参数。
// 情况2：如果异步函数内部返回的是另外一个新的 Promise，那么 Promise 的状态将交给新的 Promise 决定。
// 情况3：如果异步函数内部返回的是一个对象，并且这个对象里有实现then()方法（这种对象称为 thenable 对象），那就会执行该then()方法，并且根据then()方法的结果来决定Promise的状态。
// 情况4：如果异步函数内部在执行时遇到异常或者手动抛出异常时，那么， Promise 处于rejected 状态。

// 普通函数默认返回值是 undefined
// 异步函数的默认返回值是 Promise {undefined}
async function fn1() {
  console.log('fn1')
}

console.log(fn1())

async function fn2() {
  return 'fn2'
  // 相当于返回
  // new Promise((resolve, reject) => {resolve('fn2')})
  // Promise.resolve('fn2')
}

console.log(fn2())  // Promise {'fn2'}