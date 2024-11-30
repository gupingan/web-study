// 创建对象
let obj = new Object()
// 使用 typeof 检查对象的类型时，返回 object

// 向对象中添加属性
obj.name = '小花'
obj.gender = '女'

// 获取对象的属性
console.log(obj.name)
console.log(obj.age)

// 中括号操作对象属性，为什么需要？
// 对于 obj.123 或者 obj.'123' 这种必定错误，因为标识符（123、'123'）不符合命名规范
obj[123] = 'cool'
console.log(obj[123])

// 修改对象的属性值
obj.name = '小花小花'
console.log(obj)
// 上述的属性 123 被转换为字符串 '123'，隐式转换

// 删除对象的属性
delete obj['gender']
console.log(obj)

// in 运算符 【运算符的补充】
// 可以检查一个对象中是否有指定的属性，如果有则返回 true，否则返回 false
// 语法：key in obj
console.log('name' in obj)
console.log(123 in obj)
// 我们平时使用的对象不一定是自己创建的，可能是从接口获取的，这个时候，in 运算符可以派上用场
if (obj.name) {
  // 如果对象 obj 中有name属性
  console.log('有name属性')
}

// for ... of 获取的是数组里的值；如果采用for ... in遍历数组，则获取的是 index 索引值
// for ... of 的循环可以避免我们开拓内存空间，增加代码运行效率
// for ... of 也可以遍历 Map 对象

// for ... in主要用于遍历对象，不建议用来遍历数组
// 对象中有几个属性，循环体就会执行几次。每次执行时，会将对象中的每个属性的 属性名 赋值给变量
for (var key in obj) {
  console.log('属性名：' + key) // 这里的 key 是：对象属性的键（也就是属性名）
  console.log('属性值：' + obj[key]) // 这里的 obj[key] 是：对象属性的值（也就是属性值）
}

// for in 遍历数组（不建议）
const arr = ['hello1', 'hello2', 'hello3']
for (const key in arr) {
  console.log('属性名：' + key)
  console.log('属性值：' + arr[key])
}
