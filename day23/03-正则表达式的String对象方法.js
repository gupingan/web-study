// split()	将字符串拆分成数组
let str1 = '1a2B3c4D5e'
let res1 = str1.split(/[A-z]/)
console.log(res1)
// search()	搜索字符串中是否含有指定内容，返回索引 index
let str2 = 'hello, my name is XiaoMing'
let res2 = str2.search(/.m/i)
console.log(res2)
// match()	根据正则表达式，从一个字符串中将符合条件的内容提取出来
let str3 = '1a2B3c4D5e42'
let res3 = str3.match(/(\d)+/g)
console.log(res3)
// replace()	将字符串中的指定内容，替换为新的内容并返回
let str4 = '我爱我的父母'
let res4 = str4.replace('我', '他')
console.log(res4)
let res5 = str4.replace(/我/g, '他')
console.log(res5)

// 常见的正则表达式
// 手机号
let reg1 = /^1[3-9][0-9]{9}$/
// 去掉首尾空格
let reg2 = /^\s+|\s+$/g
console.log('   hello world   '.replace(reg2, ''))
// 邮箱
// 用户名@域名.顶级域名
let reg3 = /^[a-zA-Z0-9_.%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
console.log(reg3.test('example@example.com')) // 输出: true
console.log(reg3.test('user.name+tag@example.co.uk')) // 输出: true
console.log(reg3.test('user@example')) // 输出: false
console.log(reg3.test('user@example.')) // 输出: false
console.log(reg3.test('user@example.c')) // 输出: false
