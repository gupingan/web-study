// 根据之前的请求依赖的情况，会造成回调地狱的问题

// 传统的 ES5 嵌套
// Promise 嵌套

// 接下来看一下如何利用链式调用
// 模拟请求函数
function requestData(data, success) {
  setTimeout(function () {
    success(data)
  }, 300)
}

new Promise((resolve, reject) => {
  requestData(
    {
      user: {
        name: 'gupingan',
        gender: 1,
      },
    },
    resolve
  )
})
  .then((value) => {
    console.log('第一次请求数据', value)
    return new Promise((resolve, reject) => {
      requestData(
        {
          is_vip: true,
        },
        resolve
      )
    })
  })
  .then((value) => {
    console.log('第二次请求数据', value)
    return new Promise((resolve, reject) => {
      requestData(
        {
          friends: [],
        },
        resolve
      )
    })
  })
  .then((value) => {
    console.log('第三次请求数据', value)
  })

// 实际开发中，会封装好请求以及 Promise 的创建函数
// 一旦 return 一个新的 Promise 实例之后，后面的 then() 就可以作为这个新 Promise 在成功后的回调函数。这种扁平化的写法，更方便维护，可读性更好；并且可以更好的管理请求成功和失败的状态

// Node.js 文件系统（fs）模块中的一个方法

// fs.readFile(path, options, callback)
// 该方法异步地读取文件，并在读取完成后通过回调函数处理读取到的数据

// path：文件的路径。可以是相对路径或绝对路径，用于指定要读取的文件
// options：这是一个可选参数，用于指定读取文件时的选项。它可以是一个字符串或对象：
// 如果是一个字符串，通常用于指定编码（例如 'utf8'）。默认情况下，文件内容会被读取为 Buffer 对象。
// 如果是一个对象，可以包含多个选项，例如：
//    encoding：指定文件的编码（例如 'utf8'）
//    flag：用于指定文件访问模式（例如 'r' 表示读取）
// callback：这是一个回调函数，在文件读取完成后被调用。回调函数有两个参数
//    err：如果读取过程中发生错误，这个参数会包含错误信息。如果没有错误，则为 null
//    data：如果读取成功，这个参数会包含文件的内容。如果指定了编码，内容会是字符串；否则，内容会是 Buffer 对象

// 现在，我们尝试封装一个异步文件读取链
const fs = require('fs')

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

readFile('./01-Promise的链式调用.js').then(data => {
  console.log(data)
  return readFile('./package.json')
}).then(data => {
  console.log(data)
  return readFile('./123.js')
}).catch(err => {
  console.log(err)
})
