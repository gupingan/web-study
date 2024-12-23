// resolve 不一定改变 Promise 的状态为 fulfilled

// resolve(参数)
// 参数是普通的值或者对象时，其对应的 promise 的状态会改变会 fulfilled
// 参数是另一个 Promise 对象时，其对应的 promise 的状态交给另一个 promise 决定
// 参数是实现了 then 方法的对象时，该对象称为 thenable 对象 先执行其中的 then 方法，当前对应的 promise 状态由 then 方法决定

// reject 无论传什么参数都会改变当前 Promise 的状态为 rejected

// resolve 传入的参数是另一个 Promise 对象时
const promise2 = new Promise((resolve, reject) => {
  // reject('promise2 的 reject')
  resolve('promise2 的 resolve')
})

const promise1 = new Promise((resolve, reject) => {
  resolve(promise2)
  // resolve('promise1 的 resolve')
})

promise1
  .then((res) => {
    // 执行顺序 3
    console.log('promise1 的 then')
    console.log(res)
  })
  .catch((err) => {
    console.log('promise1 的 catch')
    console.log(err)
  })

// 执行顺序 1
promise2.then((res) => {
  console.log('promise2 的 then')
  console.log(res)
})

// resolve 传入的参数是 thenable 对象时
let obj = {
  name: 'thenable对象',
  then: function (resolve, reject) {
    // 执行顺序 2
    console.log(this.name + ' 的 ' + 'then')
    reject(this.name + ' 的 ' + 'reject')
  },
}

const promise3 = new Promise((resolve, reject) => {
  resolve(obj)
  // 这是个 thenable 对象，会立即执行 then 方法
})

promise3
  .then((res) => {
    // 执行顺序 4
    console.log('promise3 的 then')
    console.log(res)
  })
  .catch((err) => {
    console.log('promise3 的 catch')
    console.log(err)
  })
