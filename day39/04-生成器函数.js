// 生成器函数需要在 function 关键字后面加一个符号 *。
// 生成器函数可以通过 yield 关键字控制函数的执行流程。
// 生成器函数的返回值是一个生成器（Generator）。生成器是一种特殊的迭代器。
// function* generator1() { /*code*/ } // 推荐写法

function* foo() {
  console.log('1')
  console.log('2')
  console.log('3')
}

const generator1 = foo() // 无用，只创建了生成器，不执行内部内容
generator1.next()  // 一次性打印了 1 2 3


function* test2() {
  console.log('1')
  yield
  console.log('2')
  yield
  console.log('3')
}

const generator2 = test2()
generator2.next()  // 1
generator2.next()  // 2
generator2.next()  // 3

function* test3() {
  console.log('1')
  yield 1
  console.log('2')
  yield 2
  console.log('3')
  yield 3
}

const generator3 = test3()
// 先打印了 1，后面就输出返回值
console.log(generator3.next())  // { value: 1, done: false }

function* test4() {
  console.log('1')
  const res2 = yield 1
  console.log('2', 'res2:', res2)
  yield 2
  console.log('3')
  yield 3
}

const generator4 = test4()
generator4.next()
generator4.next('我是 yield 1 的返回值, 也是 next 的参数') // 当前参数将作为 yield 1 的返回值

function* test5() {
  console.log('1')
  const res2 = yield 1
  console.log('2', 'res2:', res2)
  yield 2
}

const generator5 = test5()
generator5.next() // 1
console.log(generator5.return('终止'))
console.log(generator5.next())