// Number.isInteger() 判断是否为整数
console.log(Number.isInteger(1)) // true
console.log(Number.isInteger(1.2)) // false
console.log(Number.isInteger(1.0)) // true

// toFixed() 小数点后面保留多少位，返回的是字符串
let str1 = (1.1234).toFixed(2)
console.log(str1) // 1.12
console.log(typeof str1) // string
console.log(parseFloat(str1)) // number 类型的 1.12

// 内置对象 Math 的常见方法属性
// 圆周率15位
console.log(Math.PI) // 3.141592653589793
// 获取绝对值，有隐式转换
console.log(Math.abs(-101)) // 101
console.log(Math.abs('-101')) // 101
// 生成[0, 1)随机数
console.log(Math.random())
// 引申：生成[0, max)随机数
function random(max) {
  return parseInt(Math.random() * max)
}
// 引申：生成[min, max)随机数
function randomRange(min, max) {
  return parseInt(Math.random() * (max - min) + min)
}
// 引申：生成[min, max]随机数
function randomRange(min, max) {
  // return parseInt(Math.random() * (max - min + 1) + min)
  // 极限值(max - min -1).9999 + min 比如
  // 5,7   1.99999 + 5 = 6.99999  符合范围的
  return parseInt(Math.random() * (max - min + 1)) + min
  // return Math.floor(Math.random() * (max - min + 1)) + min
  // 计算方式颇多，不止一种
}
console.log(randomRange(5, 7)) // 7  随机结果
console.log(randomRange(5, 7)) // 6  随机结果
console.log(randomRange(5, 7)) // 5  随机结果
// 向下取整（往小取值)
console.log(Math.floor(1.9999)) // 1  整数部分
// 向上取整（往大取值)
console.log(Math.ceil(1.0001)) // 2  整数部分+1
// 四舍五入 正数四舍五入，负数五舍六入
console.log(Math.round(1.4)) // 1
console.log(Math.round(1.51)) // 2
console.log(Math.round(-1.6)) // -2
console.log(Math.round(-1.5)) // -1
// 返回多个数中的最大值
console.log(Math.max(1, 2, 3, 4, 5)) // 5
// 返回多个数中的最小值
console.log(Math.min(1, 2, 3, 4, 5)) // 1
// 乘方：返回 x 的 y 次幂
console.log(Math.pow(2, 3)) // 8
// 开方：对一个数进行开方运算
console.log(Math.sqrt(16)) // 4
