// 内置对象 Date 用来处理日期和时间
// 与 Math 对象不同，Date 对象需要实例化才能使用
// 写法一：如果Date()不写参数，就返回当前时间对象
let date1 = new Date()
console.log(date1) // 2024-11-27T15:11:38.769Z
console.log(typeof date1) // object
// 写法二：如果Date()里面写参数，就返回括号里输入的时间对象
let date2 = new Date('2024-11-27 15:11:38')
console.log(date2) // 2024-11-27T07:11:38.000Z
let date3 = new Date('2024-11-27')
console.log(date3) // 2024-11-26T16:00:00.000Z
let date4 = new Date(2024, 10, 27, 15, 11, 38)
console.log(date4) // 2024-11-27T07:11:38.000Z
let date5 = new Date('Wed Jan 27 2017 12:00:00Z')
console.log(date5) // 2017-01-27T12:00:00.000Z
const params = [2020, 6, 12, 16, 20, 59]
let date6 = new Date(...params)
console.log(date6) // 2020-07-12T08:20:59.000Z
let date7 = new Date(1732721008869)
console.log(date7) // 2024-11-27T15:23:28.869Z

// 日期的格式化
// Date对象的方法
// getFullYear()	    获取年份
// getMonth()	        获取月： 0-11	    0代表一月
// getDate()	        获取日：1-31	    获取的是几号
// getDay()	          获取星期：0-6	    0代表周日，1代表周一
// getHours()	        获取小时：0-23
// getMinutes()	      获取分钟：0-59
// getSeconds()	      获取秒：0-59
// getMilliseconds()	获取毫秒	        1s = 1000ms
let date9 = new Date()
console.log(date9.getFullYear()) // 2024
console.log(date9.getMonth()) // 10 代表 11月
console.log(date9.getDate()) // 27
console.log(date9.getHours()) // 23
console.log(date9.getMinutes()) // 33
console.log(date9.getSeconds()) // 2
console.log(date9.getDay()) // 3 星期四
console.log(date9.getMilliseconds()) // 143
// 手写格式化方法
// formatDate(date, 'yyyy-MM-dd hh:mm:ss')
function formatDate(date, fmt) {
  let year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hour = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  return fmt
    .replace('yyyy', year)
    .replace('MM', month)
    .replace('dd', day)
    .replace('hh', hour)
    .replace('mm', minute)
    .replace('ss', second)
}

let date10 = new Date()
console.log(formatDate(date10, 'yyyy-MM-dd hh:mm:ss'))
// 2024-11-27 23:52:23

// 时间戳：指的是从格林威治标准时间的1970年1月1日，0时0分0秒到当前日期所花费的毫秒数（1秒 = 1000毫秒）
// 计算机底层在保存时间时，使用的都是时间戳。时间戳的存在，就是为了统一时间的单位
// 我们经常会利用时间戳来计算时间，因为它更精确。而且，在实战开发中，接口返回给前端的日期数据，都是以时间戳的形式
let date8 = new Date()
console.log(date8.getTime()) // 1732722838631
let date11 = new Date('1970/01/01 0:0:0')
console.log(date11.getTime()) // -28800000
// 不是0呢？
// 因为我们的当前代码，是在中文环境下运行的，
// 与英文时间会存在8个小时的时差（中文时间比英文时间早了八个小时）。
// 如果代码是在英文环境下运行，打印结果就是0
console.log(+date8) // 最常用
console.log(date8.valueOf())
console.log(date8 * 1)
console.log(Number(date8))
// 根据前面所讲的关于「时间戳」的概念，上方代码获取到的时间戳指的是：从 1970年1月1日，0时0分0秒 到现在所花费的总毫秒数
// H5标准中新增的特性，只能获取当前时间的时间戳
console.log(Date.now())

// 格式化时间
// 火狐和qq浏览器不兼容
Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, //月份
    'd+': this.getDate(), //日
    'h+': this.getHours(), //小时
    'm+': this.getMinutes(), //分
    's+': this.getSeconds(), //秒
    'q+': Math.floor((this.getMonth() + 3) / 3), //季度
    S: this.getMilliseconds(), //毫秒
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (this.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

let date12 = new Date()
console.log(date12.format('yyyy-MM-dd hh:mm:ss')) // 2024-11-28 00:00:30

// 利用时间戳检测代码的执行时间
// 我们可以在业务代码的前面定义 时间戳1，在业务代码的后面定义 时间戳2。把这两个时间戳相减，就能得出业务代码的执行时间。


// Moment.js 是一个轻量级的JavaScript时间库，我们可以利用它很方便地进行时间操作，提升开发效率

