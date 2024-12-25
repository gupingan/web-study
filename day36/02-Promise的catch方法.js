// catch()方法是 Promise实例上的一个方法。它其实是放在Promise的原型上的 Promise.prototype.catch

// catch()方法可以接收一个参数。这个参数是一直处于监听状态的回调函数。当 Promise 的状态为 rejected（任务执行失败）时会立即执行这个回调函数。
const promise1 = new Promise((resolve, reject) => {
  reject('promise1 reject reason')
})

promise1.catch((r) => {
  console.log('promise1 catch:', r)
})
// 同样也可以被多次调用
// 同样也是和 then 方法的特性相似
// 因为 .catch(fn) 方法本身相当于 .then(undefined, fn)
// 返回值将决定 catch 方法返回的 Promise 对象的状态
// 普通值和普通对象     返回的 promise 对象状态为 fulfilled
// 新的 promise       由新的 promise 决定返回的 promise 对象的状态
// thenable 对象      执行 then 方法，同时由 then 决策
// 发生异常            返回的 promise 对象将直接被 reject

// const promise2 = new Promise((resolve, reject) => {
//   reject('promise2 reject reason')
// })
// promise 被 reject 时，需要捕获错误，不然程序会报错
// promise2.then(function (v) {
  // console.log(v)
// })

// 同样的，也存在穿透现象，根据 Promise/A+ 规范，因为 then 中传入非函数参数将忽略，并且返回的 promise 决策传达的值或者理由都应该是上个 promise 的
const promise3 = new Promise((resolve, reject) => {
  reject('promise3 reject reason')
})

promise3.catch().then().catch().catch((r) => {
  console.log('promise1 catch:', r)
})