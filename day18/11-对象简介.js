// 什么是对象？
// 在 JavaScript 中，对象是一组无序的相关属性和方法的集合

// 对象包括哪些数据类型？
// JavaScript 中共有 8 中数据类型，只要不是 7 种基本数据类型，其它的都属于对象。
// 7 种基本数据类型：number BigInt string symbol boolean undefined null
// 单纯的来说，基本的数据类型比如 'Hello' 字符串并非对象，但是通过构造方法创建的字符串，比如 new String() 属于对象

// 对象分为几类？分别是什么？
// 3类
// 内置对象：ES标准中定义的对象，比如 Object、Math、Date、RegExp、Boolean、Error、JSON、Promise 等等
// 宿主对象：由JS运行环境提供的对象，目前主要指由浏览器提供的对象，比如 DOM BOM，比如 console、document、window 等等
// 自定义对象：开发人员自己创建的对象，通过 new 关键字创建出来的对象实例

// 自定义对象
// 为什么需要自定义对象？
// 保存单纯的一个值，可以使用变量存储，而保存多个值（一组值）可以使用数组，比如一个人的信息：
// ['老王', 18, '男', '522421........', '喜欢钓鱼']
// 这样的数据呈现的表述能力就非常的混乱
// 自定义对象可以让数据更加清晰，你能够知道这个属性表示的含义是什么，有什么用，能够操作的方法有哪些
// 比如：
let person = {
  name: '老王',
  age: 18,
  gender: '男',
  address: '522421........',
  hobby: '喜欢钓鱼',
  // 上方属性，下方函数方法
  run: function () {
    console.log('go go go')
  },
}
// 自定义对象里面的属性均是键值对（key: value），表示属性和值的映射关系，每组 key:vaue 之间用逗号分隔
/* 
const obj = {
    key: value,
    key: value,
    key: value,
}
*/

// 对象的属性名是否需要加引号？
// 如果属性名不符合 JS 标识符的命名规则，则需要引号包裹
let obj = {
  'my-name': '老王',
  'my sex': '男',
  'my age': 18,
}

// 注意：所谓 ES 标准中的内置对象或者 JavaScript 运行环境中的宿主对象本质上也是通过自定义对象的形式进行封装的

// 什么是对象的方法？
// 你有一个朋友，能唱跳Rap篮球，这些都是这个朋友能干的事情，是一种行为，这就是该对象的方法，换而言之
// 如果在 js 中自定义的对象有一个属性是函数，那么这个属性就是该对象的方法，比如上方的 person 对象中的 run 函数
const obj2 = new Object()
obj2.intro = function () {
  console.log('我是一个对象')
  return '嘻嘻'
}

console.log(obj2.intro) // 打印函数
console.log(obj2.intro()) // 调用对象方法

// 对象的属性值也可以是对象
let laohuang = {
  name: '老黄',
}
let laowang = {
  name: '老王',
  wife: laohuang,
}

console.log(laowang.wife) // 打印对象，有时打印会出现 [object Object]，就需要 JSON 转一下
console.log(JSON.stringify(laowang.wife)) // 将对象属性值对转为 JSON 字符串
console.log(laowang.wife.name) // 打印老王的妻子的名字
console.log(laowang.wife === laohuang) // 验证老王的妻子和定义的老黄是不是同一个对象

// 对象保存在哪里？
// 基本数据类型的值直接保存在栈内存中，变量与变量之间是独立的，值与值之间哪怕相等，但也是独立的，修改一个变量不会影响其他的变量
// 对象则是保存到堆内存中，一般对象需要的空间较大，并且无序，所以每创建一个新的对象，就会在堆内存中开辟空间存储，而如果变量存储
// 这个对象，则实际上存储的对象的内存地址（对象的引用），简单来说，地址在栈内存，属性值在堆内存中
// 如果两个变量保存的是同一个对象引用，当一个通过一个变量修改属性时，另一个也会受到影响
// e.g.传值
let a = 10
let b = a
b = 20
console.log(a, b) // 10 20
// e.g.传址
var p1 = new Object()
p1.name = '孙悟空'
var p2 = p1 // 将 p1 的地址赋值给 p2 从此 p1 和 p2 指向了同一个堆内存空间
//修改p2的name属性
p2.name = '猪八戒'
console.log(p1.name, p2.name) // 猪八戒 猪八戒

// 对于引用类型的数据，赋值相当于地址拷贝，a、b 指向了同一个堆内存地址。所以改了 b，a 也会变；本质上 a、b 就是一个东西。
// 如果你打算把引用类型 A 的值赋值给 B，让 A 和 B 相互不受影响的话，可以通过 Object.assign() 来复制对象(浅拷贝)
var p3 = Object.assign({}, p1)
p3.name = '沙悟净'
console.log(p1.name, p2.name, p3.name) // 猪八戒 猪八戒 沙悟净

// 深拷贝
function deepClone(obj) {
  // 不是对象直接返回
  if (obj === null || typeof obj !== 'object') return obj
  // 如果是数组，递归克隆元素
  if (Array.isArray(obj)) return obj.map(deepClone)
  // 如果是对象，递归克隆属性
  const newObj = {}
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = deepClone(obj[key])
    }
  }
  return newObj
}


const original = { a: NaN, b: { c: 2 }, d: [4, 5] };
const cloned = deepClone(original);

cloned.b.c = 3;
cloned.d[0] = 3;

console.log(original.a); // NaN
console.log(original.b.c); // 2，原对象未受影响
console.log(original.d); // [ 4, 5 ]，原对象未受影响