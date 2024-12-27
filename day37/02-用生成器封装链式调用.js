const fs = require('fs')

// 生成器（Generator）是 ES6 中引入的一种函数，它允许你在函数执行过程中暂停和恢复函数的执行。生成器函数使用 function* 语法定义，并通过 yield 关键字来暂停执行并返回一个值
// 定义一个生成器函数
function* simpleGenerator() {
  // 暂停并返回 1
  yield 1
  // 暂停并返回 2
  yield 2
  // 暂停并返回 3
  yield 3
}

// 创建一个生成器对象
const generator = simpleGenerator()

// 使用 next() 方法来获取生成器的下一个值
console.log(generator.next().value) // 输出: 1
console.log(generator.next().value) // 输出: 2
console.log(generator.next().value) // 输出: 3

function readFile(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf-8', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

function* reader() {
  yield readFile('./01-Promise的链式调用.js')
  yield readFile('./package.json')
  yield readFile('./123.js')
}

const readGenerator = reader()

readGenerator.next().value.then(data => {
  console.log('第一次调用')
  return readGenerator.next().value
}).then(data => {
  console.log('第二次调用', data)
  return readGenerator.next().value
}).catch(err => {
  console.log('第三次调用', err)
})

// 上面的生成器代码有些晦涩难懂，实际开发中，通常不会这么写
// 仅做了解