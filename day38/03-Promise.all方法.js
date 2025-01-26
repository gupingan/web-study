// Promise.all() 其参数是一个数组
// 如果数组中有一个 Promise 被拒绝，那么整个 Promise 都会失败，并且抛出第一个被拒绝的 Promise 的错误信息
// 数组中不局限是 Promise，可能是普通值等
const promise2 = Promise.resolve(1)
const promise3 = Promise.resolve(2)
const promise4 = Promise.resolve(3)
const value5 = 5

Promise.all([promise2, promise3, promise4, value5]).then(
  (res) => {
    console.log('Promise.all:', res)
  },
  (err) => {
    console.log('Promise.all:', err)
  }
)

Promise.all([promise2, promise3, promise4, value5, promise1]).then(
  (res) => {
    console.log('Promise.all:', res)
  },
  (err) => {
    console.log('Promise.all:', err)
  }
)

// Promise.all() 中 就算有一个失败了，但是其他的 Promise 仍然执行
// 当执行 Promise.all() / Promise.race() / Promise.any() 等方法时，如果其中一个任务失败了，其他任务并没有停止，会继续执行，只是所返回的 Promise 会失败
const promise5 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('promise5 仍然执行')
    resolve('done.')
  }, 2000)
})

Promise.all([promise2, promise3, promise4, promise1, promise5]).then(
  (res) => {
    console.log('Promise.all:', res)
  },
  (err) => {
    console.log('Promise.all:', err)
  }
)