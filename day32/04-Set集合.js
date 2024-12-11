// ES6 提供了 新的数据结构 Set。Set 类似于数组，但成员的值都是唯一的
// Set 本身就是一个构造函数，可通过 new Set() 生成一个 Set 的实例
const set1 = new Set()
console.log(set1.size)  // 获取集合的成员数量

// 可以接收一个数组作为参数，实现数组去重
const set2 = new Set(['张三', '李四', '王五', '张三'])
console.log([...set2])

// 去重效果