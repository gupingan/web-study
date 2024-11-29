// 翻转数组
const arr1 = [10, 20, 30, 40, 50] // 原始数组
// console.log(arr1.reverse())
const arr2 = []
for (let i = arr1.length; i > 0; i--) {
  arr2[arr1.length - i] = arr1[i - 1]
}
console.log(arr2)


// 冒泡排序
const arr3 = [20, 10, 50, 30, 40]
for (let i = 0; i < arr3.length; i++) {
  for (let j = i + 1; j < arr3.length; j++) {
    if (arr3[i] > arr3[j]) {
      let temp = arr3[i]
      arr3[i] = arr3[j]
      arr3[j] = temp
    }
  }
}
console.log(arr3)
