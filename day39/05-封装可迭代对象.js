const o = {
  name: 'gupingan',
  skill: 'coding',
  age: 23,
  [Symbol.iterator]: function* () {
    const entries = Object.entries(this)
    // for (let i = 0; i < entries.length; i++) {
    //   yield entries[i]
    // }
    // yield* 某个可迭代对象
    yield* entries
  },
}

for (const [key, value] of o) {
  console.log(key, value)
}
