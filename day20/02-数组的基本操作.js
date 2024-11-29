// 数组的索引
// 索引 (下标) ：用来访问数组元素的序号，代表的是数组中的元素在数组中的位置（下标从 0 开始算起）。
// 数组可以通过索引来访问、修改对应的数组元素
let arr1 = [1, 2, 3]
console.log(arr1[0]) // 1
arr1[0] = -1
console.log(arr1[0]) // -1
console.log(JSON.stringify(arr1)) // [-1,2,3]

// 索引也可以向数组添加元素
let arr2 = []
arr2[3] = 4
console.log(JSON.stringify(arr2)) // [null,null,null,4]
console.log(arr2[100]) // 越界访问不会报错，返回 undefined

// 获取数组的长度
let arr3 = [1, 2, 3, 4]
console.log(arr3.length) // 4
// 对于连续的数组，使用 length 可以获取到数组的长度（元素的个数）；
// 对于非连续的数组（即“稀疏数组”，稍后会讲），length 的值会大于元素的个数。因此，尽量不要创建非连续的数组
// 数组的长度也可以修改
// 如果修改的 length 大于原长度，则多出部分会空出来，置为 null
arr3.length = 5
console.log(JSON.stringify(arr3)) // [1,2,3,4,null]
// 如果修改的 length 小于原长度，则多出的元素会被删除，数组将从后面删除元素
arr3.length = 2
console.log(JSON.stringify(arr3)) // [1,2]
// 特例：伪数组 arguments 的长度可以修改，但是不能修改里面的元素

// 遍历数组
let arr4 = [1, 2, 3, 4, 5]
for (let i = 0; i < arr4.length; i++) {
  console.log(arr4[i]) // 打印数组的每个元素
}
