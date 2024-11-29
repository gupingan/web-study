// 如果一个函数在内部调用这个函数自身，这个函数就是递归函数
// 递归要素
// - 递归模式：把大问题拆解为小问题进行分析。也称为递归体。
// - 边界条件：需要确定递归到何时结束。也称为递归出口。

// 求一个正整数的阶乘
function factorial(n) {
  let r = 1
  for (let i = 1; i <= n; i++) {
    r *= i
  }
  return r
}
console.log(factorial(5)) // 120

// 递归写法
function factorial(n) {
  if (n <= 1) return 1
  return n * factorial(n - 1)
}

console.log(factorial(5)) // 120

// 喇叭花数是一个三位数，其每一位数字的阶乘之和恰好等于它本身，
// 即abc＝a! + b! + c!，其中abc表示一个三位数。请找出所有的喇叭花数
for (let i = 100; i < 1000; i++) {
  let a = Math.floor(i / 100)
  let b = Math.floor((i % 100) / 10)
  let c = Math.floor(i % 10)
  if (factorial(a) + factorial(b) + factorial(c) === i) {
    console.log('发现:', i)
  }
}


// 斐波那契数列是这样一个数列：1、1、2、3、5、8、13、21、34......最早是由意大利数学家斐波那契开始研究的。
// 它的规律是：下标为0和1的项，值为1；从下标为2的项开始，每一项等于前面两项之和
// 请找出斐波那契数列的前10项
function fib(n) {
  if ( n <= 1) return 1
  return fib(n - 1) + fib(n - 2)
}

for (let i = 0; i < 10; i++) {
  console.log(fib(i))
}