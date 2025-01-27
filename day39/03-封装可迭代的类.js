class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
    this.hobbies = ['跑步', '唱歌', '篮球']
  }

  [Symbol.iterator]() {
    let index = 0
    const self = this
    return {
      next() {
        const done = index >= self.hobbies.length
        const value = !done ? self.hobbies[index++] : undefined
        return {
          value,
          done,
        }
      },

      return() {
        console.log('迭代结束')
        return {
          done: true,
        }
      },
    }
  }
}

const p1 = new Person('张三', 18)
for (const h of p1) {
  console.log(h)
  if (h === '篮球') break
}
