// String 对象（字符串对象）的使用频率是非常高的

// 查找字符串
// indexOf()/lastIndexOf()：获取字符串中指定内容的索引
// indexOf() 是从前向后查找字符串的位置。同理，lastIndexOf()是从后向前寻找

// 索引值 = str.indexOf(想要查询的字符串);

// 查找单个字符
const str1 = 'abcdea'
// a b c d e a
// 0 1 2 3 4 5
console.log(str1.indexOf('c')) // 2
console.log(str1.lastIndexOf('c')) // 2
console.log(str1[2]) // c
// 从前往后查找第一个匹配的位置（哪怕有多个匹配的）
console.log(str1.indexOf('a')) // 0
// 从后往前查找第一个匹配的位置（哪怕有多个匹配的）
console.log(str1.lastIndexOf('a')) // 5

// 查找一句话
const str2 = '今天不吃饭那就今天不吃饭吧'
// 今 天 不 吃 饭 那 就 今 天 不 吃 饭 吧
// 0  1  2  3  4  5 6  7  8  9 10 11 12
// 从前往后匹配第一个出现的结果的第一个字的索引
console.log(str2.indexOf('不吃饭')) // 2
// 从后往前匹配第一个出现的结果的第一个字的索引
console.log(str2.lastIndexOf('不吃饭')) // 9

// 指定查找的起始位置（从哪儿开始匹配）
// 索引值 = str.indexOf(想要查询的字符串, [起始位置]);
// 吃 饭 那 就 今 天 不 吃 饭 吧
// 3  4  5  6  7  8  9 10 11 12
console.log(str2.indexOf('不吃饭', 3)) // 9
// 从索引10往前搜索，
// 今 天 不 吃 饭 那 就 今 天 不 吃 饭 吧
// 0  1  2  3  4  5 6  7  8  9 10 11 12
console.log(str2.lastIndexOf('不吃饭', 9)) // 9
// 从 9 往前搜索，不字匹配到了，不字往后是不吃饭，匹配到
console.log(str2.lastIndexOf('不吃饭', 8)) // 2
// 从 8 开始，天字没有，知道索引2的不吃饭匹配到了

// search():  获取字符串中指定内容的索引（参数里一般是正则）
// 索引值 = str.search(想要查找的字符串);
// 索引值 = str.search(正则表达式);
// 可以检索一个字符串中是否含有指定内容。如果字符串中含有该内容，则会返回其第一次出现的索引；如果没有找到指定的内容，则返回 -1
let str3 = '今天不吃饭那就今天不吃饭吧'
console.log(str3.search('不吃饭')) // 2

// includes()：字符串中是否包含指定的内容
// 布尔值 = str.includes(想要查找的字符串, [position]);
// 判断一个字符串中是否含有指定内容。如果字符串中含有该内容，则会返回 true；否则返回 false
let str4 = '今天不吃饭吧'
// 今 天 不 吃 饭 吧
// 0  1  2  3  4  5
console.log(str4.includes('不吃饭')) // true
console.log(str4.includes('不吃饭', 2)) // true
console.log(str4.includes('不吃饭', 3)) // false
console.log(str4.includes('吃饭', 3)) // true

// startsWith()：字符串是否以指定的内容开头
// 布尔值 = str.startsWith(想要查找的内容, [position]);
// 判断一个字符串是否以指定的子字符串开头。如果是，则返回 true；否则返回 false
console.log(str4.startsWith('今天')) // true
console.log(str4.startsWith('明天')) // false
console.log(str4.startsWith('不吃饭')) // false
// 从索引2开始检索，也就是 2 3 4 5 这个范围
console.log(str4.startsWith('不吃饭', 2)) // true

// 同理还有 endsWith()
let str5 = '今天不吃饭'
// 今 天 不 吃 饭
// 0  1  2  3  4
console.log(str5.endsWith('吃饭')) // true
console.log(str5.endsWith('今天')) // false
console.log(str5.endsWith('今天', 1)) // false
// 从索引2前找 0 1 这个范围
console.log(str5.endsWith('今天', 2)) // true

// 获取指定位置的字符
// charAt(index)
let str6 = '今天不吃饭'
console.log(str6.charAt(2)) // 不
for (let i = 0; i < str6.length; i++) {
  console.log(str6.charAt(i)) // 逐字获取并打印
}
// str[index]
console.log(str6[2]) // 不
// charCodeAt(index)
// 返回字符串指定位置的字符的 Unicode 编码
// 在实际应用中，通过这个方法，我们可以判断用户按下了哪个按键
console.log(str6.charCodeAt(2)) // 19981
// 代码举例：打印字符串的占位长度
// 一个英文占一个位置，一个中文占两个位置
// 思路：判断该字符是否在 0-127 之间（在的话是英文，不在是非英文）
function getZFWLength(string) {
  var count = 0
  for (let i = 0; i < string.length; i++) {
    if (string.charCodeAt(i) <= 127 && string.charCodeAt(i) >= 0) {
      count++
    } else {
      count += 2
    }
  }
  return count
}

let inputString = '你好呀hahaha' // 3 中文 6 英文
console.log(getZFWLength(inputString)) // 3 * 2 + 6 = 12
// sort 排序方法底层用到了 Unicode 编码，因此也是用到了 charCodeAt()

// 字符串截取
// slice()  支持反向索引
// 新字符串 = str.slice(开始索引, 结束索引); //两个参数都是索引值。包左不包右。
let str7 = '123456789'
// 1    2    3    4    5    6    7    8    9(原值)
// 0    1    2    3    4    5    6    7    8(正向索引)
// -9   -8   -7   -6   -5   -4   -3   -2   -1(反向索引)
console.log(str7.slice(2, 5)) // 索引范围 [2, 5) '345'
console.log(str7.slice(2)) // 索引范围 [2, ∞) '3456789'
console.log(str7.slice(-3)) // 索引范围 [-3, ∞) '789'  倒数第3个开始
console.log(str7.slice(1, -1)) // 索引范围 [1,-1) '2345678' 从第2(1+1)个 到 倒数第1个前面那个元素
console.log(str7.slice(5, 2)) // 索引范围 [5,2) 无结果 ''
console.log(str7.slice(0)) // 索引范围 [0, ∞) 无结果 '123456789'

// substring()
// 从字符串中截取指定的内容。和slice()类似
let str8 = '123456789'
// 不支持反向索引，如果传递负值，那该值就是相当于 0
// substring(-1, 2) 相当于 substring(0, 2)
console.log(str8.substring(-1, 2)) // '12'
// 会自动调整参数的位置，如果第二个参数小于第一个，则自动交换
// substring(2, 1) 相当于 substring(1, 2)
console.log(str8.substring(2, 0)) // '12'

// substr()
// str.substr(开始索引, 截取的长度)
// 从字符串中截取指定的内容。不会修改原字符串，而是将截取到的内容返回
// 这个方法的第二个参数截取的长度，不是结束索引
let str9 = '123456789'
console.log(str9.substr(2, 3)) //  从2开始，截取3位 '345'
console.log(str9.substr(2, -10)) // 长度为负值，则长度视为0 ''
console.log(str9.substr(2)) // 不指定长度，从前往后截取，'3456789'
console.log(str9.substr(-3)) // 支持反向索引 '789'
// ECMAScript 未对 substr 标准化，不建议使用它

// Unicode 转字符
// String.fromCharCode()
let code1 = 19981
console.log(String.fromCharCode(code1)) // '不'

// 拼接字符串
// str1.concat(str2)  拼接字符串，相当于 str1+str2
console.log('今天'.concat('不').concat('吃饭'))
// 今天不.concat(吃饭) -> 今天不吃饭
// 数组也有concat方法
console.log([1, 2].concat('123')) // [1, 2, '123']
console.log([1, 2].concat([1, 2, 3])) // [ 1, 2, 1, 2, 3 ]

// split()：字符串转换为数组 分割字符串（指定字符）
// 新的数组 = str.split(分隔符);
const email1 = 'gupingan@foxmail.com'
console.log(email1.split('@')) // ['gupingan', 'foxmail.com']
console.log(email1.split('')) // 分割每个字符出来，分割“啥都没有，但又啥都有”
console.log(email1.split()) // 不指定分割符时，将整个字符串收入数组 ['gupingan@foxmail.com']
console.log(email1.split('-')) // 分割符没有，同上 [ 'gupingan@foxmail.com' ]

// replace()：替换字符串
// 将字符串中的指定内容，替换为新的内容并返回
// 新的字符串 = str.replace(被替换的子串，新的子串);
// 这个方法，默认只会替换第一个被匹配到的字符。如果要全局替换，需要使用正则
let str10 = 'Today is fine day,today is fine day !'
console.log(str10.replace('today', 'tomorrow'))
// 'Today is fine day,tomorrow is fine day !'
console.log(str10.replace(/today/gi, 'tomorrow'))
// g 表示全局，i 表示忽略大小写
// 'tomorrow is fine day,tomorrow is fine day !'

// repeat()：重复字符串
// newStr = str.repeat(重复的次数);
let str11 = 'hello'
console.log(str11.repeat(3)) // 'hellohellohello'
let telephone1 = '13888487888'
let mixedTelephone =
  telephone1.slice(0, 3) + '*'.repeat(4) + telephone1.slice(7)
console.log(mixedTelephone) // 138****7888

// trim()：去除字符串前后的空白
let str12 = '  hello  '
console.log(str12.trim()) // hello

// 大小写转换
let str13 = 'hello'
let str14 = str13.toUpperCase() // HELLO
console.log(str14)
console.log(str14.toLowerCase()) // hello

// HTML方法
let str15 = '你好'

console.log(str15.anchor('hello')) //<a name="hello">你好</a>
console.log(str15.big()) // <big>你好</big>
console.log(str15.sub()) // <sub>你好</sub>
console.log(str15.sup()) // <sup>你好</sup>
console.log(str15.link('http://www.baidu.com')) // <a href="http://www.baidu.com">你好</a>
console.log(str15.bold()) // <b>你好</b>


// 链式调用，只要方法结果是字符串，同一类型支持链式调用的
console.log(str15.anchor('hello').link('http://www.baidu.com'))
// <a href="http://www.baidu.com"><a name="hello">你好</a></a>
