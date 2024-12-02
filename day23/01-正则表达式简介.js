// 正则表达式：可自定义的含特殊字符的通用规则
// 作用：检索、替换、分割、匹配

// 创建正则表达式的对象
// 1. 使用构造函数
/* 两个参数都是字符串
var 变量 = new RegExp("正则表达式");
var 变量 = new RegExp("正则表达式", "匹配模式");
 */
// 1.1 传一个参数
let reg1 = new RegExp('a')
// test() 方法，正则对象的方法，可检查字符串是否匹配正则表达式
console.log(reg1.test('gupingan')) // true
console.log(reg1.test('hello world')) // false

// 1.2 传两个参数
/* 
i: 忽略大小写，ignore
g：全局匹配，global
*/
let reg2 = new RegExp('A', 'i')
console.log(reg2.test('amond')) // true
console.log(reg2.test('Amond')) // true

// 2. 使用字面量创建
/* 注意，这个语法里没有引号
var 变量 = /正则表达式/;
var 变量 = /正则表达式/匹配模式;
 */
let reg3 = /a/i
console.log(reg3.test('amond')) // true
console.log(reg3.test('Amond')) // true

// 两种方式的小区别
// 1. 创建繁琐，参数可以传入变量
// 2. 尽管不能传入变量，但是简洁

// 注意：全局匹配 g 慎用 test() 方法
// 对于非全局匹配的正则表达式，test()只会检测是否存在某个目标字符串（只要存在就为 true），多次检测的结果都相同
// ☆ 当设置全局标志 /g 时，一旦字符串中还存在匹配，test() 方法都将返回 true，同时匹配成功后将把 lastIndex 属性的值
// 设置为上次匹配成功结果之后的第一个字符所在的位置，下次匹配将从 lastIndex 指示的位置开始；匹配不成功时返回 false，
// 同时将 lastIndex 属性的值重置为 0
let reg4 = /hi/g
console.log(reg4.test('hi_hi'))
console.log(reg4.lastIndex) // 0
console.log(reg4.test('hi_hi'))
console.log(reg4.lastIndex) // 3
console.log(reg4.test('hi_hi'))  // false
// 全局匹配模式g一般用于 exec()、match()、replace()等方法
// 全局匹配模式g如果用于test()方法会有问题。因为g模式会生成一个lastindex参数来存储匹配最后一次的位置