class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
    this.hobbies = ['跑步', '唱歌', '篮球']
  }

  *[Symbol.iterator] () {
    yield* this.hobbies
  }
}

const p1 = new Person('张三', 18)
for (const h of p1) {
  console.log(h)
  if (h === '篮球') break
}
