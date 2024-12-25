// then() 方法提供两个可选参数
// resolveFulfilled 当 promise 状态为 fulfilled 时触发执行
// resolveRejected 当 promise 状态为 rejected 时触发执行

const promise1 = new Promise((resolve, reject) => {
  reject('promise1 reject reason')
})

promise1.then(undefined, function (reason) {
  console.log(reason)
})

promise1.then(undefined, function (reason) {
  console.log(reason)
})
// then 方法可以多次调用

promise1.catch(function (e) {
  console.log(e)
})

// then() 方法的返回值
// then() 方法本身的返回值是一个新的 promise，因此可以实现链式调用。
// 暂且将 then 方法返回的 promise 称之为 tp
// 那么：
// then 中的回调函数正在执行时，tp 的状态为 pending
// then 中的回调函数被手动 return 时，tp 的状态取决于返回值的类型：
// 1.如果返回值是一个新的 Promise，那么将取决于 Promise 的状态
// 2.如果返回值是一个普通值或者对象，那么 tp 的状态为 fulfilled
// 3.如果返回值是一个 thenable 对象，那么其对象的 then 方法会立即执行，并根据 then 方法的结果结果决定 tp 的状态
// 4.如果回调函数执行过程中发生异常，tp 的状态为 rejected

// then()方法里，我们可以通过 return 传递结果和状态给新的 Promise

const promise2 = new Promise((resolve, reject) => {
  resolve('promise2 resolved')
})

promise2
  .then(function () {
    return promise1
  })
  .then( // then 中回调是否执行，执行哪个由前一个 then 返回的 Promise 所决策
    function (value) {
      console.log('promise2 fulfilled,' + value)
    },
    function (reason) {
      console.log('promise2 rejected,' + reason)
    }
  )

  // 当 then 中传入非函数时，将导致决策结果可穿透到后方的 then 中
  promise2.then().then().then(function (value) {
    console.log('promise2 then 穿透', value)
  })
