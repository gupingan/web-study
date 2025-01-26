// 可以在async声明的异步函数中，使用 await关键字来暂停函数的执行，等待一个异步操作完成
// 提示：await 关键字不能在普通函数中使用，只能在异步函数中使用

// （1）await的后面是一个表达式，这个表达式要求是一个 Promise 对象（通常是一个封装了异步任务的Promise对象）。await执行完成后可以得到异步结果。

// （2）await 会等到当前 Promise 的状态变为 fulfilled之后，才继续往下执行异步函数

// async/await 本质是 生成器 Generator 的语法糖，是对Generator的封装

function requestData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('done')
    }, 500)
  })
}

async function fn1() {
  const data = await requestData()
  console.log('fn1', data)
  return data
}

fn1().then((data) => {
  console.log('then:', data)
})

// 链式调用
async function fn2() {
  const data1 = await requestData()
  console.log('data1' , data1)
  const data2 = await requestData()
  console.log('data2' , data2)
}

fn2()