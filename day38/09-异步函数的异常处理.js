// 如果异步函数内部在执行时遇到异常或者手动抛出异常时，那么这个异步函数返回的Promise 处于rejected 状态。

// 捕获并处理异步函数的异常时，有两种方式：
// 方式1：通过 Promise的catch()方法捕获异常。
// 方式2：通过 try catch捕获异常。
function requestData1() {
  return new Promise((resolve, reject) => {
    reject('任务1失败')
  })
}

function requestData2() {
  return new Promise((resolve, reject) => {
    resolve('任务2成功')
  })
}

async function fn1() {
  const data1 = await requestData2()
  console.log(data1)
  const data2 = await requestData1()
  console.log(data2)
}
// 直接调用不处理报错
// fn1()
// 方式一
// fn1().catch(err => {
//   console.log(err)
// })
// 方式二
async function fn2() {
  try {
    const data1 = await requestData2()
    console.log(data1)
    const data2 = await requestData1()
    console.log(data2)
  } catch (error) {
    console.log(error)
  }
}

// fn2()
// 在 async 函数中，不是所有的异步任务都需要 await。如果两个任务在业务上没有先后依赖关系，则不需要 await；也就是说，可以并发执行，不需要线性执行，避免无用的等待。
