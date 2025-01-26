console.log('script start');

async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}

async function async2() {
  console.log('async2');
  await async3();
  console.log('async2 end');
}

async function async3() {
  console.log('async3');
}

setTimeout(() => {
  console.log('setTimeout1');
}, 0);

setTimeout(() => {
  console.log('setTimeout2');
}, 100);

async1();

new Promise(resolve => {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('then1');
}).then(function () {
  console.log('then2');
});

console.log('script end');