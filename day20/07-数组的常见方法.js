// 数组类型相关
console.log('Array.isArray()：判断是否为数组 ')
// 以前使用 isinstanceof 判断，现在主要使用 isArray()
let arr1 = []
console.log(Array.isArray(arr1)) // true

console.log('toString()：将数组转换为字符串(String()构造器也可以)')
let arr2 = [1, 2, 3]
console.log(arr2.toString()) // 1,2,3

console.log('join()：将数组转换为字符串，返回结果为转换后的字符串')
let arr3 = [1, 2, 3]
console.log(arr3.join()) // 1,2,3
console.log(arr3.join('-')) // 1-2-3

console.log('split()：将字符串分割为数组（不是数组的方法）')
let str = 'hello world'
console.log(str.split()) // ["hello world"]
console.log(str.split('')) // ["h", "e", "l", "l", "o", " ", "w", "o", "r", "l", "d"]
console.log(str.split(' ')) // ["hello", "world"]

console.log('Array.from(arrayLike)：将伪数组对象转换为数组')
// 伪数组：包含 length 属性的对象或可迭代的对象，原型链中没有 Array.prototype，所以没有数组的一般方法
let obj = {
  0: 'a',
  1: 'b',
  2: 'c',
  length: 3,
}
console.log(Array.from(obj)) // ["a", "b", "c"]

console.log(
  'Array.of(element0, element1, ..., elementN)：创建一个具有给定数组元素作为项的新数组'
)
// new Array 与 Array.of 区别在于：当参数只有一个时，前者表示数组的长度，后者表示数组中的内容。
let arr4 = Array.of(3, 4, '5')
console.log(arr4) // [3, 4, '5']

// 数组的添加和删除
console.log('push()：向数组的末尾添加一个或多个元素，并返回新的长度')
let arr5 = [1, 2, 3]
console.log(arr5.push(4)) // 4
console.log(arr5.push(5, -5)) // 6
console.log(arr5)

console.log('pop()：删除数组的最后一个元素，并返回被删除的元素')
let arr6 = [1, 2, -3]
console.log(arr6.pop()) // -3
console.log(arr6)

console.log('unshift()：向数组的开头添加一个或多个元素，并返回新的长度')
let arr7 = [1, 2, 3]
console.log(arr7.unshift(4)) // 4
console.log(arr7.unshift(6, 6)) // 6
console.log(arr7)

console.log('shift()：删除数组的第一个元素，并返回被删除的元素')
let arr8 = [1, 2, -3]
console.log(arr8.shift()) // 1
console.log(arr8)

console.log(
  'splice()：从数组中删除指定的一个或多个元素，返回结果为被删除元素组成的新数组'
)
let arr9 = [1, 2, 3, 4, 5]
// 从索引2开始删除2个元素
console.log(arr9.splice(2, 2)) // [3, 4]
console.log(arr9) // [1, 2, 5]
console.log(arr9.splice()) // []
console.log(arr9) // [1, 2, 5]
// 删除后两个元素
console.log(arr9.splice(-2)) // [2, 5]
console.log(arr9) // [1]
let arr9_1 = [1, 2, 3, 4, 5]
// 删除指定元素 3
arr9_1.splice(arr9_1.indexOf(3), 1)
console.log(arr9_1) // [1, 2, 4, 5]
// 删除从索引1的2位元素，并在其位置插入6,6,6
arr9_1.splice(1, 2, 6, 6, 6)
console.log(arr9_1) // [1, 6, 6, 6, 5]

console.log('slice()：从数组中提取指定的一个或多个元素，返回结果为新的数组')
let arr10 = [1, 2, 3, 4, 5]
// 提取索引[2, 5)的元素
console.log(arr10.slice(2, 5)) // [3, 4, 5]
console.log(arr10) // [1, 2, 3, 4, 5]
console.log(arr10.slice(2, 10)) // [3, 4, 5]
console.log(arr10.slice()) // [1, 2, 3, 4, 5]
// 提取后两个元素
console.log(arr10.slice(-2)) // [4, 5]

console.log('concat()：合并数组：连接两个或多个数组，返回结果为新的数组')
let arr11 = [1, 2, 3]
let arr12 = [4, 5, 6]
console.log(arr11.concat(arr12)) // [1, 2, 3, 4, 5, 6]
console.log(arr11) // [1, 2, 3]
console.log(arr12) // [4, 5, 6]
console.log([...arr11, ...arr12]) // [1, 2, 3, 4, 5, 6]

console.log('fill()：填充数组：用固定的值填充数组，返回结果为填充后的数组')
let arr13 = [1, 2, 3]
console.log(arr13.fill(0)) // [0, 0, 0]
console.log(arr13) // [0, 0, 0]
console.log(arr13.fill(6, 1, 3)) // [0, 6, 6]

// 数组排序
console.log(
  'reverse()：反转数组：将数组中的元素顺序颠倒，返回结果为颠倒后的数组'
)
let arr14 = [1, 2, 3]
console.log(arr14.reverse()) // [3, 2, 1]
console.log(arr14) // [3, 2, 1]

console.log(
  'sort()：排序数组：对数组的元素,默认按照Unicode 编码，从小到大进行排序'
)
let arr15 = [1, -2, 3]
console.log(arr15.sort()) // [1, 2, 3]
console.log(arr15) // [1, 2, 3]
// 如果在 sort()方法中带参，我们就可以自定义排序规则。具体做法如下：
// 我们可以在 sort()的参数中添加一个回调函数，来指定排序规则。
// 回调函数中需要定义两个形参，JS将会分别使用数组中的元素作为实参去调用回调函数。
// JS根据回调函数的返回值来决定元素的排序：（重要）
// 1. 如果返回一个大于 0 的值，则元素会交换位置
// 2. 如果返回一个小于 0 的值，则不交换位置。
// 3. 如果返回一个等于 0 的值，则认为两个元素相等，则不交换位置
let arr15_1 = [1, -2, 3]
// 自定义排序规则
// var arr15_1_result = arr15_1.sort(function (a, b) {
//   if (a > b) {
//     // 如果 a 大于 b，则交换 a 和 b 的位置
//     return 1
//   } else if (a < b) {
//     // 如果 a 小于 b，则位置不变
//     return -1
//   } else {
//     // 如果 a 等于 b，则位置不变
//     return 0
//   }
// })

// var arr15_1_result = arr15_1.sort(function (a, b) {
//   return a - b
// })

var arr15_1_result = arr15_1.sort((a, b) => a - b)
console.log(arr15_1_result)

// 查找数组的元素
console.log('indexOf(value)：从前往后索引，检索一个数组中是否含有指定的元素')
let arr16 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(arr16.indexOf(3)) // 2
console.log(arr16.indexOf(-3)) // -1
// 从索引3往后找
console.log(arr16.indexOf(3, 3)) // -1

console.log(
  'lastIndexOf(value)：从后往前索引，检索一个数组中是否含有指定的元素'
)
let arr17 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(arr17.lastIndexOf(3)) // 2
console.log(arr17.lastIndexOf(-3)) // -1
// 从索引1往前找
console.log(arr17.lastIndexOf(3, 1)) // -1

console.log('includes(item)：数组中是否包含指定的内容')
let arr18 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
console.log(arr18.includes(3)) // true
console.log(arr18.includes(-3)) // false

console.log('find(function())：找出第一个满足「指定条件返回 true」的元素')
let arr19 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// 找到第一个偶数
console.log(arr19.find((item, index, array) => item % 2 === 0)) // 2

console.log(
  'findIndex(function())：找出第一个满足「指定条件返回 true」的元素的 index'
)
let arr20 = [1, 2, 3, 4, 5, 6, 7, 8, 9]
// 找到第一个大于3的数的索引
console.log(arr20.findIndex((item, index, array) => item > 3)) // 3

// 全真则真，一假则假
console.log(
  'every()：确保数组中的每个元素都满足「指定条件返回 true」,则停止遍历,此方法才返回 true'
)
let arr21 = [1, 2, 3, 4, -1]
// 检查arr21是否全部是正数
console.log(arr21.every((item) => item > 0)) // false
// 检查arr20是否全部是正数
console.log(arr20.every((item) => item > 0)) // true

// 有一则真，点到为止
console.log(
  'some()：数组中只要有一个元素满足「指定条件返回 true」,则停止遍历,此方法就返回 true'
)
let arr22 = [1, 2, 3, 4, -1]
// 检查arr22是否存在负数
console.log(arr22.some((item) => item < 0)) // true
// 检查arr20是否存在负数
console.log(arr20.some((item) => item < 0)) // false

// 遍历数组
console.log('for 循环：原始传统的方法')
let arr23 = ['大', '威', '天', '龙']
for (let i = 0; i < arr23.length; i++) {
  console.log(arr23[i], i, arr23)
}

console.log('forEach()：遍历数组，但需要兼容 IE8 以上')
arr23.forEach((item, index, array) => {
  console.log(item, index, array)
})

console.log('for of: 遍历数组(ES6语法)')
for (let element of arr23) {
  console.log(element)
}
// 不要使用 for in 遍历数组
// for in 是专门用于遍历对象的。对象的属性是无序的（而数组的元素有顺序），
// for in循环就是专门用于遍历无序的对象。所以，不要用 for in 遍历数组
// for (let key in obj) {
//   console.log(key);
//   console.log(obj.key);
// }

console.log('map()：对原数组中的每一项进行加工，将组成新的数组')
let arr24 = arr23.map((item, index, array) => `*${item}-${index}`)
console.log(arr24) // [ '*大-0', '*威-1', '*天-2', '*龙-3' ]

console.log(
  'filter()：过滤数组：返回结果是 true 的项，将组成新的数组，返回结果为新的数组'
)
let arr25 = ['*大-0', '*威-1', '*天-0', '*龙-3']
let arr26 = arr25.filter((item, index, array) => item.endsWith('0'))
console.log(arr25) // [ '*大-0', '*威-1', '*天-0', '*龙-3' ]
console.log(arr26) // [ '*大-0', '*天-0' ]

console.log('reduce: 接收一个函数作为累加器，返回值是回调函数累计处理的结果')
// arr.reduce(function (previousValue, currentValue, currentIndex, arr) {}, initialValue);
// previousValue：必填，上一次调用回调函数时的返回值
// currentValue：必填，当前正在处理的数组元素
// currentIndex：选填，当前正在处理的数组元素下标
// arr：选填，调用 reduce()方法的数组
// initialValue：选填，可选的初始值（作为第一次调用回调函数时传给 previousValue 的值）
let arr27 = ['*大-0', '*威-1', '*天-0', '*龙-3']
let arr28 = arr27.reduce((pre, cur, index, arr) => {
  return pre + cur
}, '合并结果：')
console.log(arr27) // 未变化
console.log(arr28) // 合并结果：*大-0*威-1*天-0*龙-3

// initialValue(pre)
// currentValue
// run....
// previousValue
// currentValue
// run....
// 求和
let arr29 = [2, 0, 1, 9, 6]
console.log(
  arr29.reduce((pre, cur, index, arr) => {
    return pre + cur
  }, 0)
) // 18

// 统计某个元素出现的次数
let arr30 = [1, 2, 6, 5, 6, 1, 6]
let target = 6
// console.log(
//   arr30.reduce((pre, cur, index, arr) => {
//     return cur === target ? pre + 1 : pre
//   }, 0)
// )
console.log(
  arr30.reduce((pre, cur, index, arr) => {
    pre += cur === target ? 1 : 0
    return pre
  }, 0)
) // 3
