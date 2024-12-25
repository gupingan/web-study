const MyPromise = require('./09-手写Promise')

const promise = new MyPromise((resolve, reject) => {
  console.log(1)
  resolve(2)
})

promise.then(function (msg) {
  console.log(msg)
})

new MyPromise((resolve, reject) => {
  console.log(3)
  setTimeout(() => resolve(4), 3000)
}).then(function (msg) {
  console.log(msg)
  return new MyPromise((resolve, reject) => {
    resolve(6)
  }).then((msg) => {
    console.log(msg)
  })
})

console.log(5)