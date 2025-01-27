const o = {
  name: 'gupingan',
  skill: 'coding',
  age: 23,
  [Symbol.iterator]() {
    let index = 0
    const entries = Object.entries(this)
    return {
      next() {
        const done = index >= entries.length
        const value = !done ? entries[index++] : undefined
        return {
          value,
          done,
        }
      },
    }
  },
}

for (const [key, value] of o) {
  console.log(key, value)
}
