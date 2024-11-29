// IIFE: 立即执行函数
// 函数定义完，即刻调用
// Immediately-invoked function expression  立即执行函数表达式
/* 
无分号情况
;(function() {
  // 函数体
})()

有分号情况
(function() {
  // 函数体
})();

// 传参
;(function() {
  // 函数体
})(a, b)
*/

// 匿名函数
let c = function (a, b) {
  console.log('a = ' + a)
  console.log('b = ' + b)
}

c(1, 2)
// IIFE
;(function (a, b) {
  console.log('a = ' + a)
  console.log('b = ' + b)
})(1, 2)

// IIFE 作用
// 为变量赋值
let sex = '男'
let nickname = (function () {
  return sex === '男' ? '帅哥' : '美女'
})()
console.log(nickname) // 帅哥
sex = '女'
console.log(nickname) // 帅哥，早就执行并赋值了，就算修改性别也不会联动改变

// 将全局变量变为局部变量
let arr1 = []
for (var i = 0; i < 5; i++) {
  arr1.push(function () {
    console.log(i)
  })
}

arr1[2]() // 5
// 为什么？因为 var i 是全局的，如果使用 let 则不会出现这种问题，作用域是块级作用域，
// 而 var 是函数作用域，所以会一直被共享，所以会一直指向最后一个 i 值 5
console.log(i)

// let i 是一种手段，限制作用域

// IIFE 也可以
let arr2 = []
for (var i = 0; i < 5; i++) {
  ;(function (i) {
    arr2.push(function () {
      console.log(i)
    })
  })(i) // 立即执行创建，此时的 var i 在函数作用域中仅仅是这个函数的参数，传递给 push 中的函数后，保持当时的 i，不会共享
}

arr2[2]() // 2
