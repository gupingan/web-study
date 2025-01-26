// Promise.race([p1, p2, p3])：参数里传的是多个 Promise 元素组成的数组。可以并发处理多个Promise，整体的执行状态取第一个执行完成的 Promise的状态，且状态和第一个完成的任务状态保持一致
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
  }, 1000)
})

const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log('执行 promise3')
    resolve('promise 3 成功')
  }, 3000)
})

Promise.race([promise1, promise2, promise3]).then((res) => {
  console.log('race:', res)
}).catch(err => {
  console.log('race:', err)
})

// 可应用于处理异步任务超时
function timeout(ms, tips) { 
  return new Promise((_, reject) => {
    setTimeout(function() {
      reject(tips)
    }, ms)
  })
}

function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        data: [],
        msg: 'success', 
        code: 200
      })
    }, 3100)
  })
}

function getDataWithTimeout() {
  return Promise.race([getData(), timeout(3000, '请求超时')])
}

getDataWithTimeout().then(res => {
  console.log('res:', res)
}).catch(err => {
  console.log('err:', err)
})