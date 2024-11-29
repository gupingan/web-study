/* 
switch(表达式) {
	case 值1：
		语句体1;
		break;

	case 值2：
		语句体2;
		break;

	...
	...

	default：
		语句体 n+1;
		break;
}
*/
/* 
switch 语句的结束条件【非常重要】
情况 a：遇到 break 就结束（而不是遇到 default 就结束）。因为 break 在此处的作用是，立即结束并退出整个 switch 语句。
情况 b：执行到程序的末尾就结束。
*/
let msg = 'notice'

switch (msg) {
  case 'notice':
    console.log('提示')
    break
  case 'warning':
    console.log('警告')
    break
  case 'error':
    console.log('错误')
    break
  default:
    console.log('默认文案')
    break
}

let age = 28

switch (true) {
  case age < 18:
    console.log('未成年人')
    break
  case age >= 18 && age <= 65:
    console.log('还能干活儿')
    break
  case age > 65:
    console.log('该退休了')
    break
  default:
    console.log('默认文案')
    break
}
// switch 中的 default 无论放到什么位置，都会等到所有case 都不匹配再执行。default 也可以省略
switch (msg) {
  case 'warning':
    console.log('警告')
    break
  case 'error':
    console.log('错误')
    break
}

// case 穿透
const num = 4

//switch判断语句
switch (num) {
  case 1:
    console.log('星期一')
    break
  case 2:
    console.log('星期二')
    break
  case 3:
    console.log('星期三')
    break
  case 4:
    console.log('星期四')
  //break;
  case 5:
    console.log('星期五')
  //break;
  case 6:
    console.log('星期六')
    break
  case 7:
    console.log('星期日')
    break
  default:
    console.log('你输入的数据有误')
    break
}

// 根据接口的返回码 retCode ，来让前端做不同的展示
let retCode = 1003
switch (retCode) {
  case 0:
    console.log('接口联调成功')
    break
  case 101:
    console.log('活动不存在')
    break

  case 103:
    console.log('活动未开始')
    break

  case 104:
    console.log('活动已结束')
    break

  case 1001:
    console.log('参数错误')
    break

  case 1002:
    console.log('接口频率限制')
    break

  case 1003:
    console.log('未登录')
    break

  case 1004:
    console.log('（风控用户）提示 活动太火爆啦~军万马都在挤，请稍后再试')
    break

  // 其他异常返回码
  default:
    console.log('系统君失联了，请稍候再试')
    break
}


// 新例子
let day = 2

switch (day) {
  case 1:
  case 2:
  case 3:
  case 4:
  case 5:
    console.log('work')
    break // 在这里放一个 break

  case 6:
  case 7:
    console.log('relax')
    break // 在这里放一个 break

  default:
    break
}

// if 和 switch如何选择
// 如果是对区间进行判断，则建议用 if。如果是对几个固定的值进行判断，那么，数量少的话用 if，数量多的话用switch
