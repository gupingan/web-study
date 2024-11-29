// 数组（Array）是属于内置对象，数组和普通对象的功能类似，都可以用来存储一些值。不同的是：
// 普通对象是使用字符串作为属性名，而数组是使用数字作为索引来操作元素。索引：从 0 开始的整数就是索引

// 创建数组
// 1. 字面量
let arr1 = [] // 空数组
let arr2 = [1, 2, 3] // 有初始值的数组
console.log(arr1, arr2) // [] [ 1, 2, 3 ]
console.log(typeof arr1) // object
console.log(typeof arr2) // object
// 2. 构造函数
let arr3 = new Array() // 空数组
let arr4 = new Array(1, 2, 3) // 有初始值的数组
console.log(arr3, arr4) // [] [ 1, 2, 3 ]
console.log(typeof arr3) // object
console.log(typeof arr4) // object
let arr5 = new Array(6) // 具备 6 个空项的数组
console.log(arr5) // [ <6 empty items> ]
console.log(arr5[0]) // undefined
console.log(arr3[0]) // undefined
console.log(arr5.length) // 6
console.log(arr3.length) // 0

// 利用 JSON 查看真实的数据
console.log('arr3:', JSON.stringify(arr3))
// arr3: []
console.log('arr4:', JSON.stringify(arr4))
// arr4: [1,2,3]
console.log('arr5:', JSON.stringify(arr5))
// arr5: [null,null,null,null,null,null]

// 数组中可以放任意的元素
let arr6 = [
  1,
  'hello',
  true,
  undefined,
  null,
  { name: 'why' },
  function () {
    console.log('嘻嘻')
  },
  NaN,
  Infinity,
  [1, 2, 3]
]
console.log(arr6)
console.log(arr6.length)
console.log(arr6[5].name)  // 访问数组中对象的属性 打印：why
arr6[6]()  // 调用数组中的函数 打印：嘻嘻
