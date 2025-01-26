console.log("script start")

setTimeout(() => {
  console.log("setTimeout1");
  new Promise(resolve => {
    resolve();
  }).then(() => {
    new Promise(resolve => {
      resolve();
    }).then(() => {
      console.log("then1");
    });
    console.log("then2");
  });
});

new Promise(resolve => {
  // 下面这两行代码，即便调换顺序，也不影响打印结果
  console.log("promise1");
  resolve();
}).then(() => {
  console.log("then3");
});

setTimeout(() => {
  console.log("setTimeout2");
});

console.log('同步代码');

queueMicrotask(() => {
  console.log("queueMicrotask")
});

new Promise(resolve => {
  resolve();
}).then(() => {
  console.log("then4");
});

console.log("script end");