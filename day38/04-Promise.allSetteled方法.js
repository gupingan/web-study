// Promise.allSettled() 是ES11（ES 2020）中提供的新API。它会等待所有的 Promise 元素都有结果（无论是 fulfilled，还是rejected）后，才会有最终的结果（settled），而且状态一定是 fulfilled。
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行 promise1')
    resolve('promise 1 成功')
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

Promise.allSettled([promise1, promise2, promise3]).then((res) => {
  console.log('allSettled:', res)
})
