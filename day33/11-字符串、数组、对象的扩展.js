// includes(str)：判断是否包含指定的字符串
// startsWith(str)：判断是否以指定字符串开头
// endsWith(str)：判断是否以指定字符串结尾
// repeat(count)：重复指定次数

// 二进制与八进制数值表示法: 二进制用0b, 八进制用0o
// Number.isFinite(i)：判断是否为有限大的数。比如Infinity这种无穷大的数，返回的就是 false。
// Number.isNaN(i)：判断是否为 NaN。
// Number.isInteger(i)：判断是否为整数。
// Number.parseInt(str)：将字符串转换为对应的数值。
// Math.trunc(i)：去除小数部分

// Object.is(v1, v2) 确定两个值是否为相同值
// 都是 undefined
// 都是 null
// 都是 true 或者都是 false
// 都是长度相同、字符相同、顺序相同的字符串
// 都是相同的对象（意味着两个值都引用了内存中的同一对象）
// 都是 BigInt 且具有相同的数值
// 都是 symbol 且引用相同的 symbol 值
// 都是数字且
//     都是 +0
//     都是 -0
//     都是 NaN
//     都有相同的值，非零且都不是 NaN
console.log(Object.is({}, {}))  // false
console.log(Object.is(NaN, NaN))  // true
console.log(NaN === NaN)  // false NaN 不与任何值相等

// Object.assign
// 将一个或者多个源对象中所有可枚举的自有属性复制到目标对象，并返回修改后的目标对象
// Object.assign(target, ...sources)
// target  需要应用源对象属性的目标对象，修改后将作为返回值。
// sources  一个或多个包含要应用的属性的源对象。