console.log(a)
fun1(1)
var a = 123
console.log(a)

var fn1 = () => {
  console.log(a)
}

function fun1(a) {
  console.log(a)
  var a = 666
  console.log(a)
  function a() {}
  console.log(a)
  var b = function () {}
  console.log(b)
  function c() {}
}

fun1(1)

/* output:
undefined
[Function: a] 或者 function a() {}
666
666
[Function: b] 或者 function () {}
123
123
*/


// 全流程分析：
// 1. 创建全局对象 GO
// 2. 加载当前js文件
// 3. 脚本语法分析
// 4. 当前js文件预编译
// 4-1. 查找变量声明
/* 
GO = {
  a: undefined
}
*/
// 4-2. 查找函数声明（除了函数表达式）
/* 
GO = {
  a: undefined,
  fn1: function fn1(a) {}
}
*/

// 5. 正常执行(执行到函数调用前)
/* 
console.log(a) // 打印 undefined
fn1(1) // 执行到这里了，小心，函数也有预编译，执行前一刻完成
*/

// 6. 函数预编译
// 6-1. 创建 AO 对象
/* 
AO = {}
*/
// 6-2.查找变量和形参
/* 
AO = {
  a: undefined,
  b: undefined,
  c: function c() {}
}
*/
// 6-3. 实参值和形参统一
/* 
AO = {
  a: 1,
  b: undefined,
  c: function c() {}
}
*/
// 6-4. 查找函数（非函数表达式）
/* 
AO = {
  a: function a() {},
  b: undefined,
  c: function c() {}
}
*/

// 7. 正常执行函数(根据 AO)
/* 
console.log(a)  // 打印 function a() {}
var a = 666  // a 改变，AO.a = 666
console.log(a)  // 打印 666
function a() {}  // 该声明已提升过，不会覆盖
console.log(a)  // 打印 666
var b = function () {}  // b改变，AO.b = function () {}
console.log(b)  // 打印 function () {} 有可能打印 function b() {}，根据具体JS环境打印
function c() {}  // 该声明已提升过，不会覆盖
*/

// 8. 接着执行函数外代码，执行到下个函数调用前
/* 
fn1(1) // 已讲述，上续
var a = 123  // GO 对象中的 a 改变为 123（undefined > 123）
console.log(a)  // 打印 123

var fn1 = () => {  // fn1 改变，GO.fn1 = () => {...}
  console.log(a)
}

function fn1(a) {  // 该声明已提升过（函数提升），不会覆盖
  ...
}

fn1(1)  // 执行到这里时，预编译
*/

// 9. 函数预编译
// 9-1. 创建 AO 对象
// 9-2.查找变量和形参
// 9-3. 实参值和形参统一
// 9-4. 查找函数（非函数表达式）
/* 
AO = {}
*/

// 10. 正常执行函数(根据 AO)
/* 
console.log(a)  // a不存在当前函数作用域，往上级查找，找到 GO.a，打印 123
*/