// JS 无非是两大类型：基本数据类型和引用数据类型
// JS 提供了三个基本包装类，可将基本数据类型转换为对象
// String() 将基本数据类型 string 转为 String 对象
// Number() 将基本数据类型 number 转为 Number 对象
// Boolean() 将基本数据类型 boolean 转为 Boolean 对象
let str1 = '黄晓明'
let str2 = new String(str1)
console.log(str1 == str2) // true 对象和字符串，对象将调用 toString 方法转为字符串
console.log(str1 === str2) // false 类型不同
console.log(typeof str1) // string
console.log(typeof str2) // object

// 在实际应用中一般不会使用基本数据类型的对象，其中一个原因如下：
let bool1 = new Boolean(true)
let bool2 = new Boolean(true)
console.log(bool1 == bool2)  // false 对象比较，比较的是内存地址
console.log(bool1 === bool2)  // 同理，两个对象比较，比较的是内存地址
console.log(true == true)  // 必定为 true
let bool3 = new Boolean(false)
if (bool3) {
  console.log('bool3 打印了')
}

// 当我们对一些基本数据类型进行方法调用时，JS引擎会临时使用包装类将基本数据类型转为引用数据类型（隐式转换）
var str3 = '周杰伦'
console.log(str3.length)  // 3
console.log(str3.split(''))  // 将字符串分割 [ '周', '杰', '伦' ]
// 上方代码其实像这样：
var tempStr3 = new String(str3)  // 封装
console.log(tempStr3.length)  // 3
console.log(tempStr3.split(''))  // [ '周', '杰', '伦' ]
tempStr3 = null  // 销毁

// 字符串在内存中实际以字符数组的形式保存的
console.log(str3[0])  // 周
console.log(str3[2])  // 伦
// 将像这样的：[ '周', '杰', '伦' ]