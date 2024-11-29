/* 
while(条件表达式){
	语句...
}
*/
// 执行流程：
/* 
while语句在执行时，先对条件表达式进行求值判断：

	如果值为true，则执行循环体：
		循环体执行完毕后，继续对表达式进行判断
		如果为true，则继续执行循环体，以此类推

	如果值为false，则终止循环
*/
// 如果有必要的话，我们可以使用 break 来终止循环
// e.g. 假如投资的年利率为5%，试求从1000块增长到5000块，需要花费多少年
let money = 1000
let year = 0

while (money < 5000) {
  money *= 1.05
  year++
}

console.log(`需要${year}年，钱数为${money}`)

/* 
do{
	语句...
} while(条件表达式)
*/
// 执行流程：
/* 
do...while语句在执行时，会先执行循环体：

	循环体执行完毕以后，再对while后的条件表达式进行判断：
		如果结果为true，则继续执行循环体，执行完毕继续判断，以此类推
		如果结果为false，则终止循环
*/

// while 循环和 do...while 循环的区别
/* 
while：先判断后执行。只有条件表达式为真，才会执行循环体。
do...while：先执行后判断。无论条件表达式是否为真，循环体至少会被执行一次。
*/

/* 
break
break 可以用来退出 switch 语句或退出整个循环语句（循环语句包括 for 循环、while 循环。不包括 if。单独的 if 语句里不能用 break 和 continue，否则会报错）。
break 会立即终止离它最近的那个循环语句。
可以为循环语句创建一个 label，来标识当前的循环（格式：label:循环语句）。使用 break 语句时，可以在 break 后跟着一个 label，这样 break 将会结束指定的循环，而不是最近的
*/
for (let i = 0; i < 5; i++) {
  console.log('i的值:' + i)
  if (i == 2) {
    break // 注意，虽然在 if 里 使用了 break，但这里的 break 是服务于外面的 for 循环。
  }
}

outer: for (let i = 0; i < 5; i++) {
  console.log('外层循环 i 的值：' + i)
  for (let j = 0; j < 5; j++) {
    break outer // 直接跳出outer所在的外层循环（这个outer是我自定义的label）
    console.log('内层循环 j 的值:' + j)
  }
}


/* 
continue
continue 只能用于循环语句（包括 for 循环、while 循环，不包括 if。单独的 if 语句里不能用 break 和 continue，否则会报错）。可以用来跳过当次循环，继续下一次循环。
同样，continue 默认只会离他最近的循环起作用。
同样，如果需要跳过指定的当次循环，可以使用 label 标签。
*/
for (let i = 0; i < 10; i++) {
  if (i % 2 == 0) {
      continue;
  }
  console.log('i的值:' + i);
}