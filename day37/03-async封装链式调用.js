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

// async function readFiles(...paths) {
//   let i = 0
//   for await (const path of paths) {
//     await readFile(path)
//       .then(() => {
//         console.log(i + 1, path, '调用成功')
//       })
//       .catch(() => {
//         console.log(i + 1, path, '调用报错')
//       })
//     i++
//   }
// }

// async function readFiles(...paths) {
//   for (let i = 0; i < paths.length; i++) {
//     const path = paths[i]
//     await readFile(path)
//       .then(() => {
//         console.log(i + 1, path, '调用成功')
//       })
//       .catch(() => {
//         console.log(i + 1, path, '调用报错')
//       })
//   }
// }

async function readFiles(...paths) {
  for (let i = 0; i < paths.length; i++) {
    const path = paths[i]
    try {
      const data = await readFile(path)
      console.log(i + 1, path, '调用成功')
    } catch (error) {
      console.log(i + 1, path, '调用报错')
    }
  }
}

// readFiles('./01-Promise的链式调用.js', './package.json', './123.js')

// 统一处理失败的情况，不继续往下走
// 针对 a、b、c 这三个请求，不管哪个请求失败，我都希望做统一处理。这种代码要怎么写呢?我们可以在最后面写一个 catch。
// 由于是统一处理多个请求的异常，所以只要有一个请求失败了，就会马上走到 catch，剩下的请求就不会继续执行。比如说：
// a 请求失败：然后会走到 catch，不执行 b 和 c
// a 请求成功，b 请求失败：然后会走到 catch，不执行 c
// 也就是说 穿透现象！
// readFile('./123.js')
//   .then((v) => {
//     console.log('读取文件 123.js')
//     return readFile('./01-Promise的链式调用.js')
//   })
//   .then((v) => {
//     console.log('读取文件 01-Promise的链式调用.js')
//     return readFile('./package.json')
//   })
//   .then((v) => {
//     console.log('读取文件 package.json')
//     return readFile('./package123.json')
//   })
//   .then((v) => {
//     console.log('读取文件 package123.json')
//   })
//   .catch((err) => {
//     console.log('统一处理异常：', err)
//   })

// 中间的任务失败后，如何继续往下走？
// 在多个Promise的链式调用中，如果中间的某个Promise 执行失败，还想让剩下的其他 Promise 顺利执行的话，那就请在中间那个失败的Promise里加一个失败的回调函数（可以写到then函数的第二个参数里，也可以写到catch函数里）。捕获异常后，便可继续往下执行其他的Promise。
readFile('./123.js')
  .then((v) => {
    console.log('读取文件 123.js')
    return readFile('./01-Promise的链式调用.js')
  })
  .catch(() => {
    // 如果使用 finally 能行吗？不行，因为 finally 的返回值不参与决策下一个 then 的触发，当前活动的 Promise 仍然是以上一个 then 方法回调函数的返回值决策
    // 处理报错情况，以致于可以继续调用
    return readFile('./01-Promise的链式调用.js')
  })
  .then((v) => {
    console.log('读取文件 01-Promise的链式调用.js')
    return readFile('./package.json')
  })
  .then((v) => {
    console.log('读取文件 package.json')
    return readFile('./package123.json')
  })
  .then((v) => {
    // 这里不会打印，因为文件不存在，所以这里触发 catch
    console.log('读取文件 package123.json')
  })
  .catch((err) => {
    console.log('统一处理异常：', err)
  })
