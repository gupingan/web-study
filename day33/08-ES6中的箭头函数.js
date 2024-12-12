// (参数1, 参数2 ...) => { 函数体 }

// 如果有且仅有 1 个形参，则()可以省略
// 如果函数体内有且仅有 1 条语句，则{}可以省略，但前提是，这条语句必须是 return 语句
// 箭头函数是没有函数名的。可以将箭头函数赋值给一个变量，通过变量名调用函数；也可以直接使用箭头函数
const sayHi = () => {
  console.log('hi')
}

sayHi()
;(() => {
  console.log('hello')
})()

const sayHello = (data) => console.log(data)
sayHello('嘿嘿嘿，你好呀')

const add = (a, b) => a + b
console.log(add(100, 200)) // 300

// 箭头函数的this指向：
// 箭头函数在其周围的作用域上创建一个 this 值的闭包，这意味着箭头函数的行为就像它们是“自动绑定”的——无论如何调用，this 都绑定到函数创建时的值（在上面的例子中，是全局对象）
const logThis = () => console.log(this)

logThis() // 当前全局对象

let obj1 = { name: '姑姑'}
logThis.call(obj1) // 无效改变

function Obj2() {
  this.name = '叔叔'
  this.logThis = () => console.log(this)
}

new Obj2().logThis() // Obj2 { name: '叔叔', logThis: [Function (anonymous)] }

let obj3 = {
  name: '爹爹',
  logThis: () => {
    console.log(this)
  }
}
obj3.logThis()  // 该函数定义在对象的字面量定义中，但是其this实际上也是定义时决定的，也就是全局对象
// 如果是 function () {...} 类似的方法，这取决于调用的对象是谁，this就是谁

class Obj4{
  constructor (name) {
    this.name = name
    this.logThis = () => {
      console.log(this)
    }
  }
}
 
new Obj4('哈哈').logThis()  // Obj4 { name: '哈哈', logThis: [Function (anonymous)] }
new Obj4('嘻嘻').logThis()  // Obj4 { name: '嘻嘻', logThis: [Function (anonymous)] }
// class 中的 this 是指向自身的，因此这个this指向对象

function foo() {
  console.log(this)
  ;(() => {
    console.log(this)
  })()
}

foo.call(new Obj4('呵呵'))  // 箭头函数中的this指向函数的this，而函数的this被更改，所以也同步更改


// 面试题：箭头函数的 this 指向
/* 
var name = '许嵩';
var obj = {
    name: '千古壹号',
    sayHello: () => {
        console.log(this.name);
    },
};

obj.sayHello();  // 许嵩
*/