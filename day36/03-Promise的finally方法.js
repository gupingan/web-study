// finally() 方法是在ES9（ES 2018）中新增的一个特性，表示 Promise 对象无论变成 fulfilled 状态 还是 rejected 状态，finally() 里传入的回调函数都会被执行

// finally() 里可传入一个参数，这个参数是一个回调函数。回调函数不传参数，因为前面无论是 fulfilled 状态，还是 rejected状态，这个回调函数都会执行

const promise1 = new Promise((resolve, reject) => {
  resolve('promise1 resolved value')
})

promise1.finally(() => {
  console.log('finally')
})

// Promise 是⼀个拥有 then ⽅法的对象或函数，反之不一定。
// 任何符合 promise 规范的对象或函数都可以成为 Promise
// finally 回调函数的返回值（如果不是拒绝态的 Promise 等）不会改变 Promise 的最终状态
// 如果其中的回调函数执行失败或者返回一个拒绝的 Promise，将会捕获到错误，并返回一个拒绝状态的 Promise

promise1
  .then((val) => {
    console.log(val)
    return 'then finished'
  })
  .finally(() => {
    console.log('finally.')
    return promise1 // 不参与决策
  })
  .then((val) => {
    console.log(val)
  })

Promise.resolve(42)
  .finally(() => {
    throw new Error('Finally error')
  })
  .then((result) => {
    console.log('Then:', result) // 不会执行
  })
  .catch((error) => {
    console.log('Catch:', error.message) // 输出: Catch: Finally error
  })

Promise.resolve(42)
  .finally(() => {
    return Promise.reject(new Error('Finally rejected'))
  })
  .then((result) => {
    console.log('Then:', result) // 不会执行
  })
  .catch((error) => {
    console.log('Catch:', error.message) // 输出: Catch: Finally rejected
  })

/* 参考下列代码的原理
// 无论如何都会执行 onFinally
// 通过创建新的 Promise 并中间加了一层 then 方法传递前一个 Promise 的值或者理由给下一个 then 方法（如果有）
MyPromise.prototype.finally = function (onFinally) {
  return this.then(
    function (value) {
      return new MyPromise((resolve) => {
        resolve(onFinally())
      }).then(function () {
        return value
      })
    },
    function (reason) {
      return new MyPromise((resolve) => {
        resolve(onFinally())
      }).then(function () {
        throw reason
      })
    }
  )
}
*/
