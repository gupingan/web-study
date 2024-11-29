// 三种形式
// 条件成立执行，条件不成立不做，继续执行后面的语句
// if (条件表达式) {
// 条件为真时，做的事情
// }
// 其他语句...

// e.g. 判断成绩是否及格
let score = 71
if (score >= 60) {
  console.log('及格')
}

// 条件成立执行A，否则执行B，紧接着执行后面的语句
// if (条件表达式) {
// 条件为真时，A事务
// } else {
// 条件为假时，B事务
// }
// 其他语句...

// e.g. 根据性别（仅考虑男、女）提示不同的欢迎语
let gender = '男'
if (gender == '男') {
  console.log('欢迎先生')
} else {
  console.log('欢迎女士')
}

// 条件1成立时执行A，1不成立而条件2成立时执行B，……，否则执行 other 语句，最后执行后面的语句
// if (条件表达式1) {
// 条件1为真时，做的事情A
// } else if (条件表达式2) {
// 条件1不满足，条件2满足时，做的事情B
// } else if (条件表达式3) {
// 条件1、2不满足，条件3满足时，做的事情C
// } else {
// 条件1、2、3都不满足时，做的事情 Other
// }
// 其他语句...

// e.g.BMI（身体质量指数）显示一个人的体型 BMI = 体重(kg)÷身高的平方(m)
// 过轻：低于18.5
// 正常：18.5-24.99999999
// 过重：25-27.9999999
// 肥胖：28-32
// 非常肥胖, 高于32
let weight = 65
let height = 1.7
let bmi = weight / height ** 2
if (bmi < 18.5) {
  console.log('过轻')
} else if (bmi < 25) {
  console.log('正常')
} else if (bmi < 28) {
  console.log('过重')
} else if (bmi <= 32) {
  console.log('肥胖')
} else {
  console.log('非常肥胖')
}

// 其他写法
if (bmi > 32) {
  console.log('非常肥胖')
} else if (bmi >= 28) {
  console.log('肥胖')
} else if (bmi >= 25) {
  console.log('过重')
} else if (bmi >= 18.5) {
  console.log('正常')
} else {
  console.log('过轻')
}

// IF语句的嵌套
// 一个加油站为了鼓励车主多加油，所以加的多有优惠。
// 92号汽油，每升6元；如果大于等于20升，那么每升5.9；
// 97号汽油，每升7元；如果大于等于30升，那么每升6.95
// 编写JS程序，用户输入自己的汽油编号，然后输入自己加多少升，弹出价格。
let number = 92
let capacity = 32
let price = 0
if (number == 92) {
  if (capacity < 20) {
    price = 6 * capacity
  } else {
    price = 5.9 * capacity
  }
} else if (number == 97) {
  if (capacity < 30) {
    price = 7 * capacity
  } else {
    price = 6.95 * capacity
  }
} else {
  console.log('暂不支持其他型号的机油')
}

console.log('需要耗费的金额是：' + price + '元')
