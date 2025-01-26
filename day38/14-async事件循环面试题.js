console.log('script start')

async function async2() {
  console.log('async2')
}

async function async1() {
  console.log('async1 start')
  await async2();
  await async2();
  // 这里会暂停，将 async1 end 放入微任务队列中
  console.log('async1 end')
}

setTimeout(() => {
  console.log('setTimeout')
}, 0)

async1();

new Promise(resolve => {
  console.log('promise1')
  resolve();
}).then(function () {
  console.log('then1')
})

console.log('script end');