// 迭代器的原理是设计一个符合特定要求的 next 方法，该方法将返回一个特定的对象，其中包含两个属性 done 或者 value

let a = '顾平安'.split('')

function createArrayIterator(array) {
  let i = 0
  return {
    next: function () {
      const done = i >= array.length
      const value = !done ? array[i++] : undefined
      return {
        value,
        done,
      }
    },
  }
}

let iterator = createArrayIterator(a)
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// 可迭代对象
console.log(a[Symbol.iterator])
console.log(a[Symbol.iterator]())

let aIter = a[Symbol.iterator]()
console.log(aIter.next())
console.log(aIter.next())
console.log(aIter.next())
console.log(aIter.next())
console.log(aIter.next())

// 本质上利用迭代
for (let item of a) {
  console.log(item)
}
