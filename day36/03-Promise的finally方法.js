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
// finally 回调函数的执行不会改变 Promise 的最终状态（即解决值或拒绝原因）