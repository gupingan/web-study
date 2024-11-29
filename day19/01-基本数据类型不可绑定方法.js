// 字符串 string
let str = 'Hello, Li Ming.'
str.aaa = 123
str.f = console.log
console.log(str.aaa)  // undefined
console.log(str.f)  // undefined

// 字符串对象 String
let obj = new String('Hello, Li Ming.')
obj.aaa = 123
obj.f = console.log
console.log(obj.aaa) // 123
console.log(obj.f)  // [Function: log]
obj.f('嘻嘻嘻')  // 嘻嘻嘻 可正常调用