// 浅拷贝：只拷贝最外面一层的数据；更深层次的对象，只拷贝引用
// 深拷贝：拷贝多层数据；每一层级别的数据都会拷贝
// 拷贝引用的时候，是属于传址，而非传值

// 用 for in 实现浅拷贝
const obj1 = {
  name: 'gupingan',
  age: 28,
  info: {
    desc: '很厉害',
  },
}

const obj2 = {}
for (let key in obj1) {
  obj2[key] = obj1[key]
}

obj2.name = 'gupingan666'
console.log(obj1) // { name: 'gupingan', age: 28, info: { desc: '很厉害' } }
console.log(obj2) // { name: 'gupingan666', age: 28, info: { desc: '很厉害' } }
console.log(obj1 === obj2) // false

// 修改 obj1 第二层数据时，obj2 对应的属性值也改变了，所以这是浅拷贝，只拷贝了外层
obj1.info.desc = '很厉害666'
console.log(obj1) // { name: 'gupingan', age: 28, info: { desc: '很厉害666' } }
console.log(obj2) // { name: 'gupingan666', age: 28, info: { desc: '很厉害666' } }
console.log(obj1.info === obj2.info) // true

// 用 Object.assign() 实现浅拷贝
// 语法：Object.assign(目标对象, 源对象1, 源对象2...)
const obj3 = Object.assign({}, obj1)
obj3.name = 'gupingan777'
console.log(obj1) // { name: 'gupingan', age: 28, info: { desc: '很厉害666' } }
console.log(obj3) // { name: 'gupingan777', age: 28, info: { desc: '很厉害666' } }
console.log(obj1 === obj3) // false

// 【写法1】浅拷贝：把 obj1 拷贝给 obj31
const obj31 = {}
Object.assign(obj31, obj1)
// 【写法2】浅拷贝：把 obj1 拷贝给 obj32
const obj32 = Object.assign({}, obj1)
// 【写法3】浅拷贝：把 obj1 拷贝给 obj34 注意，这里的 obj34 和 obj33 其实是等价的，他们指向了同一个内存地址
const obj33 = {}
const obj34 = Object.assign(obj33, obj1)
console.log(obj33 === obj34) // true
// 上面这三种写法，是等价的


// 深拷贝的实现方式
// 用 for in 递归实现深拷贝
// function deepClone(obj) {
//   let newObj = {}
//   for (let key in obj) {
//     let item = obj[key]
//     if (item instanceof Array) {
//       newObj[key] = []
//       for (let i = 0; i < item.length; i++) {
//         newObj[key].push(deepClone(item[i]))
//       }
//     } else if (item instanceof Object) {
//       newObj[key] = deepClone(item)
//     } else {
//       newObj[key] = item
//     }
//   }
//   return newObj
// }

// 自写递归
function deepClone(obj) {
  // 不是对象或者是null直接返回
  if (typeof obj !== 'object' || obj === null) return obj
  // 处理数组
  if (Array.isArray(obj)) return obj.map(deepClone)
  // 处理对象
  let newObj = new Object()
  for(let key in obj) {
    // 确保只处理对象自身的属性，而不是原型链上的属性
    if (!obj.hasOwnProperty(key)) continue
    newObj[key] = deepClone(obj[key])
  }
  return newObj
}

let obj4 =  {
  name: 'gupingan',
  age: 28,
  info: {
    desc: '很厉害',
  },
  arr: [1, 2, {
    name: 'arr内层对象'
  }],
  arr2: new Array(6)
}
let obj5 = deepClone(obj4)
console.log(obj4 === obj5)  // false
console.log(obj4.info === obj5.info)  // false
console.log(obj4.arr === obj5.arr)  // false
console.log(obj4.arr[2] === obj5.arr[2]) // false
console.log(obj5.arr2)