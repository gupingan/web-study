// Promise.any() 其参数是一个数组
// 如果数组中有一个 Promise 被实现，那么整个 Promise 都会实现，如果全部被拒绝，那么返账的 Promise 也被拒绝
// 数组中不局限是 Promise，可能是普通值等
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行 promise1')
    reject('promise 1 失败')
  }, 1000)
})

const promise2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行 promise2')
    reject('promise 2 失败')
  }, 2000)
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行 promise3')
    resolve('promise 3 成功')
  }, 3000)
})

Promise.any([promise1, promise2, promise3]).then((res) => {
  console.log('any:', res)
}).catch(err => {
  console.log('any:', err)
})
