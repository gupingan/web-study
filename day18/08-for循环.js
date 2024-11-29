/* 
for(①初始化表达式; ②条件表达式; ④更新表达式){
	③语句...
}
*/
// 执行流程
/* 
①执行初始化表达式，初始化变量（初始化表达式只会执行一次）

②执行条件表达式，判断是否执行循环：
	如果为true，则执行循环③
	如果为false，终止循环

④执行更新表达式，更新表达式执行完毕继续重复②
*/
for (let i = 0; i < 4; i++) {
  console.log(i)
}
// 初始化：i = 0
// 条件 i < 4
// 更新 i++
// 内部打印 i
// i 循环变量
// 初始值 0
// i++ 步长，每次增加1

for (let i = 0; i < 4; i += 2) {
  console.log(i)
}
// 0 2
// 初始值 0，步长 2，那么就是 0 2 4（不符合条件，4不输出，停止）

// 习题1
for (let i = 1; i < 10; i = i + 3) {
  i = i + 1
  console.log(i) // 输出：2 6 10
}

// 习题2
for (let i = 1; i <= 10; i++) {}
// console.log(i) // 报错：ReferenceError: i is not defined，let 只在对应的块级作用域生效

// 习题3
for (var i = 1; i <= 10; i++) {}
console.log(i) // 11

// 习题4: 根据步长找到恰好不符合条件的最小值
for (var i = 1; i < 7; i = i + 3) {}
console.log(i) // 7

// 习题5
// for (let i = 1; i > 0; i++) {
//   console.log(i)  // 死循环，从1一直打印，诸如 1 2 3 ...
// }
