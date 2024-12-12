// ES5中新增了bind()函数来改变this的指向。
// Function 实例的 bind() 方法创建一个新函数，当调用该新函数时，它会调用原始函数并将其 this 关键字设置为给定的值，同时，还可以传入一系列指定的参数，这些参数会插入到调用新函数时传入的参数的前面
const m = {
  x: 32,
  getX: function() {
    return this.x
  }
}

const unboundGetX = m.getX
console.log(unboundGetX())

const boundGetX = m.getX.bind(m)
console.log(boundGetX())