
// Promise.resolve 返回失败状态的 Promise（特殊情况）
// Promise.resolve(失败的Promise)
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject('rejected')
  }, 2000)
})

Promise.resolve(promise1).then(
  (res) => {
    console.log(res)
  },
  (err) => {
    console.log(err)
  }
)

// Promise.resolve 和 Promise.reject 通常用于将现成的内容转为 Promise 对象
// Promise.resolve(1) 相当于 new Promise((resolve) => resolve(1))
// Promise.reject(1) 相当于 new Promise((_, reject) => reject(1))

// 情况1：如果resolve()中传入普通的值或者普通对象，那么这个值会作为then()回调的参数。Promise 的状态为fulfilled。
// 情况2：如果resolve()中传入的是另外一个新的 Promise，那么原 Promise 的状态将交给新的 Promise 决定。
// 情况3：如果resolve()中传入的是thenable 对象，那就会执行该then()方法，并且根据then()方法的结果来决定Promise的状态

// reject()中无论传入什么参数，最终这个 Promise 都会被拒绝