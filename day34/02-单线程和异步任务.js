/* JavaScript 是一种单线程的编程语言，这意味着它一次只能执行一个任务。这种设计主要是由于历史原因和简化编程复杂性。多线程操作需要加锁，编码的复杂性会增高。此外，如果多个线程同时操作同一个 DOM，在多线程不加锁的情况下，会产生冲突，最终会导致 DOM 渲染的结果不符预期。

尽管 JavaScript 是单线程的，但浏览器是多进程多线程的。浏览器为每个标签页分配一个渲染进程，渲染进程包含多个线程，如 GUI 渲染线程、JavaScript 引擎线程、事件触发线程、定时器触发线程、网络请求线程等。

耗时任务理论上会堵塞运行，但是存在异步机制，异步任务会进入 event table 中，执行完成后放入 event queue 中，等待主线程将执行栈中的任务做完，将通知它有任务需要做，然后完成 event queue 中要做的事情。

在 JavaScript 中，异步任务分为宏任务（macrotask）和微任务（microtask）。

- 宏任务（macrotask）：包括整体代码（script）、`setTimeout`、`setInterval`、UI 渲染、I/O、`postMessage`、`messageChannel`、`setImmediate`（Node.js 环境）。
- 微任务（microtask）：包括 `Promise`、`MutaionObserver`、`process.nextTick`（Node.js 环境）。

注意：`new Promise()` 是宏任务，`then` 内部是微任务。

JavaScript 的执行机制如下：

1. 首先，确认代码是同步还是异步。同步代码进入执行栈在主线程执行。
2. 执行完成主线程的同步代码后，看异步任务。
3. 在异步任务中根据 Timer -> I/O -> check -> close Callbacks 过程执行，每执行一步会推一段代码到主线程中。
4. 推到主线程之后判断是宏任务还是微任务，宏任务和微任务区分开去执行。
5. 先看微任务队列，再看宏任务队列
6. 不论是宏任务还是微任务，最后都是在执行栈中由主线程去执行。
 */
// 示例
console.log(1)  // 先打印 1
setTimeout(() => {  // 推入 event table，1000ms后推入到 event queue 中
  console.log(2)
}, 1000)

new Promise((resolve) => {
  console.log(3)  // 先打印 3
  setTimeout(() => {  // 推入 event table，3000ms后推入到 event queue 中
    console.log(4)
  }, 3000)
  resolve() // 推入 event queue 中，等待同步任务执行完毕即刻打印
})
  .then((res) => {
    console.log(5)
  })
  .then((res) => {
    console.log(6)
  })

setTimeout(() => {  // 推入到 event table 中，2000ms后推入到 event queue
  new Promise((resolve) => {
    resolve()  // 推入 event queue 中，等待宏任务做完，然后做微任务，前提是 promise 到了执行时机
    console.log(7)
  }).then((res) => {
    console.log(8)
  })
}, 2000)

setTimeout(() => {  // 推入到 event table 中，3000ms后推入到 event queue
  console.log(9)
}, 3000)

console.log(10)  // 先打印 10
// 综上，可得知
// 1 3 10   同步方法中直接打印
// 5 6      均是微任务打印
// 2        宏任务到时间了执行
// 7 8      7 是同步方法中 8 是微任务
// 4        先执行的宏任务
// 9        后执行的宏任务
// 1 3 10 5 6 2 7 8 4 9

// 同步任务

// 异步任务
// 微任务
// 宏任务

// 以上已经是过去的说法了，由于任务的类型复杂，已经不存在宏任务这种说法了。
// 目前是 不同的异步任务放到不同类型的队列中
// 延时队列：优先级中。用于存放计时器完成后的回调函数
// 交互队列：优先级高。用于存放用户操作后的浏览器事件回调任务
// 微队列：优先级最高。用于存放需要执行最快的任务

// 面试题：阐述一下 JS 的事件循环
// 事件循环，也称之为消息循环。浏览器的渲染主线程如果仅同步方式去处理任务，极有可能被长时任务堵塞，导致其他的任务被滞留在后，因此事件循环的产生就是为了解决这个问题，它将开启一个不断的循环，这个循环中，首先会将执行栈的任务做完清空，然后遍历消息队列，如果有任务就将其纳入执行栈中执行，没有的话会进行休眠，当其他线程推送任务到消息队列中时，会唤醒事件循环告知其有任务，事件循环就再次开启。在过去，消息队列分为宏任务和微任务队列，但是如今的浏览器环境的复杂程度上升，已经不存在宏任务队列的说法了，而是分为延时、交互、微队列三种队列，消息队列中的消息并无优先级，保持队列的顺序先进先出，但是这三种队列存在优先级别，分别是 中 高 最高。微队列优先级别最高，因此会被优先调度执行，比如 Promise.then/catch/finally MutationObserver 等。