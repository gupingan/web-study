// js对象/数组 --> json对象/数组
let obj1 = {
  a: [1, 2, 3],
  b: 'hello world'
}
let json1 = JSON.stringify(obj1)
console.log(json1)

let arr1 = [1, 2, 3, '4', true]
let json2 = JSON.stringify(arr1)
console.log(json2)

// json对象/数组 --> js对象/数组
let obj2 = JSON.parse(json1)
console.log(obj2)

let arr2 = JSON.parse(json2)
console.log(arr2)

// 通常所说的 JSON 字符串指的是 json 对象或者 json 数组
'{"a":[1,2,3],"b":"hello world"}'
'[1,2,3,"4",true]'