// Error对象 
// 1. Error对象是所有错误对象的基类
// 2. Error对象可以继承，自定义错误对象
// 3. 常用的：TypeError, RangeError, ReferenceError, SyntaxError, EvalError, URIError 等

function sum(num1, num2) {
  if (typeof num1 !== 'number')
    throw new TypeError('num1 is not a number')
  if (typeof num2 !== 'number')
    throw new TypeError('num2 is not a number')

  return num1 + num2
}

console.log(sum(1, 2))  // 正常使用

// 捕获错误
try {
  console.log(sum(10, 10))
  console.log(sum(1, '2'))
} catch (e) {
  console.log('捕获错误：', e)
}

try {
  console.log(sum(10, 10))
  console.log(sum(1, false))
} catch (e) {
  console.log('捕获错误：', e)
} finally {
  console.log('无论错误与否，都会执行')
}

// try catch finally 仅对同步任务生效，因为所在的内存空间是不同的，所以异步任务无效，当然，异步函数中可以支持。