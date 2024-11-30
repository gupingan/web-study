// 稀疏数组：索引不连续、数组长度大于元素个数的数组，可以简单理解为有 empty（有空隙）的数组
let sparseArray = []
sparseArray[0] = 1
sparseArray[2] = 3
sparseArray[4] = 5
console.log(sparseArray) // 输出: [1, <1 empty item>, 3, <1 empty item>, 5]
console.log(sparseArray.length) // 输出: 5

// 产生情况：
// 另外还有 delete 操作导致稀疏数组
// 直接设置数组长度导致扩增的情况
// 基本上 new Array(length) 会导致稀疏数组

// 空元素：
// <1 empty item> 不等于 undefined，它是一个空的对象的引用，JS无这种类型，不同引擎会有不同的值差异

// 特性
// 大多数遍历数组的方法中，遇到「empty」元素的时候，callback 函数是不会执行的，
// 如：forEach 等, 而且这种现象在 for...in 语句中，同样适用
// 稀疏数组在访问元素的速度上比密集数组慢，散列表需要计算，密集直接通过索引访问，所以访问速度会快
// sort 方法能够正常排序，「empty」元素仍然会被保留
// 尽量避免创建稀疏数组



// 密集数组：索引连续、数组长度等于元素个数的数组
let denseArray = [1, 2, 3, 4, 5]
console.log(denseArray) // 输出: [1, 2, 3, 4, 5]
console.log(denseArray.length) // 输出: 5

// 稀疏数组 => 密集数组
// var arr = new Array(5); // 稀疏数组  
// // ES5  
// Array.apply(null, arr);  
// // ES6  
// Array.form(arr);  
// [...arr];

// 密集数组 => 稀疏数组
// var arr = [1,3,4,5,6]; // 密集数组   
// arr.length = 10 // [1, 3, 4, 5, 6, empty × 5]
