// This is a JavaScript Quiz from BFE.dev
setTimeout(() => {
  console.log(9)
}, 0)

setTimeout(() => {
  console.log(10)
}, 0)

console.log(1)

const promise = new Promise((resolve) => {
  console.log(2)
  resolve()
  console.log(3)
})

console.log(4)

promise.then(() => {
  console.log(5)
}).then(() => {
  console.log(6)
})

console.log(7)

setTimeout(() => {
  console.log(8)
}, 10)

// 1 2 3 4 7 5 6 9 10 8

