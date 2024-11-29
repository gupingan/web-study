// 解构赋值是 ES6 中的新增语法，用来为变量赋值
const arr1 = [1, 2, [3, 4]]
// let a = arr1[0]
// let b = arr1[1]
// let c = arr1[2]
// 啰嗦！

// 解构赋值
let [a, b, c] = arr1
console.log(a) // 1
console.log(b) // 2
console.log(c) // [3, 4]

// 左边的格式，必须和右边能够推导有效
// 左边的个数和右边的个数，可以不一样

// 默认值
let [x, y = 3, z = 4] = [1, 2]
console.log(x) // 1
console.log(y) // 2 默认值被覆盖
console.log(z) // 4 x,y已被一一推导，z默认值生效

// 扩展运算符(ES6新增)打包多的元素
let [a1, ...a2] = [1, 2, 3]
console.log(a1) // 1
console.log(a2) // [2, 3]