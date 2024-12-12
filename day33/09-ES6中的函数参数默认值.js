// ES6中的函数支持默认值
function cool(param = 'hello') {
  console.log(param);
}

cool()
// 默认值的后面，不能再有没有默认值的变量
// 默认值如果是前面出现的参数，那么就是该参数的值，而不是外面定义的值
var d = 1
function sum(d, f=d) {
  console.log(d, f)
}

sum(3) // 3, 3