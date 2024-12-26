const MyPromise = require('./默写MyPromise1')

MyPromise.race([new MyPromise((resolve, reject) => {
  resolve('123')
})]).then(function (value) {
  console.log(value)
  return '456'
}).then(console.log)