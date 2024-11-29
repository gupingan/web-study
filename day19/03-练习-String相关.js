// 练习 1："smyhvaevaesmyh"查找字符串中所有 m 出现的位置
let str1 = 'smyhvaevaesmyvh'
for (let i = 0; i < str1.length; i++) {
  const element = str1[i];
  if (element == 'm') {
    console.log(i);
  }
}

// 练习 2：判断一个字符串中出现次数最多的字符，统计这个次数
let hash = {}
let maxCountChar = null
for (let i = 0; i < str1.length; i++) {
  let element = str1[i];
  if (!hash[element]) {
    hash[element] = 1
  } else {
    hash[element]++
  }

  // 如果 maxCountChar 没有初始值 或者 当前元素出现的此处超过了之前统计的最大次数，那么它就是新的 maxCountChar
  if (!hash[maxCountChar] || hash[element] > hash[maxCountChar])  {
    maxCountChar = element
  }
}
console.log(`出现次数最大的元素是: ${maxCountChar}，次数是: ${hash[maxCountChar]}`)