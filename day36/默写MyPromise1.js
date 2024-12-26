// 手写 Promise/A+ 不允许查看规范

const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

function MyPromise(fn) {
  this.state = PENDING
  this.value = null
  this.reason = null

  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  const that = this

  function resolve(value) {
    if (that.state !== PENDING) return

    that.value = value
    that.state = FULFILLED

    that.onFulfilledCallbacks.forEach((cb) => cb(that.value))
  }

  function reject(reason) {
    if (that.state !== PENDING) return

    that.reason = reason
    that.state = REJECTED

    that.onRejectedCallbacks.forEach((cb) => cb(that.reason))
  }

  typeof fn === 'function' && fn(resolve, reject)
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this

  if (this.state === FULFILLED) {
    let promise2 = new MyPromise((resolve, reject) => {
      setTimeout(function () {
        if (typeof onFulfilled !== 'function') {
          resolve(that.value)
        } else {
          try {
            let x = onFulfilled(that.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }
      }, 0)
    })

    return promise2
  }

  if (this.state === REJECTED) {
    let promise2 = new MyPromise((resolve, reject) => {
      setTimeout(function () {
        if (typeof onRejected !== 'function') {
          reject(that.reason)
        } else {
          try {
            let x = onRejected(that.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        }
      }, 0)
    })

    return promise2
  }

  if (this.state === PENDING) {
    let promise2 = new MyPromise((resolve, reject) => {
      that.onFulfilledCallbacks.push(function () {
        setTimeout(function () {
          if (typeof onFulfilled !== 'function') {
            resolve(that.value)
          } else {
            try {
              let x = onFulfilled(that.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }
        }, 0)
      })

      that.onRejectedCallbacks.push(function () {
        setTimeout(function () {
          if (typeof onRejected !== 'function') {
            reject(that.reason)
          } else {
            try {
              let x = onRejected(that.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (e) {
              reject(e)
            }
          }
        }, 0)
      })
    })

    return promise2
  }
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('The promise and return value are the same'))
  }

  if (x instanceof MyPromise) {
    x.then((y) => resolvePromise(promise, y, resolve, reject), reject)
  } else if (typeof x === 'function' || typeof x === 'object') {
    if (x === null) {
      return resolve(x)
    }

    let then
    try {
      then = x.then
    } catch (e) {
      return reject(e)
    }

    if (typeof then === 'function') {
      let called = false

      try {
        then.call(
          x,
          (y) => {
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          (r) => {
            if (called) return
            called = true
            reject(r)
          }
        )
      } catch (e) {
        if (called) return
        reject(e)
      }
    } else {
      resolve(x)
    }
  } else {
    resolve(x)
  }
}

MyPromise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}

// ES2018 引入
MyPromise.prototype.finally = function (onFinally) {
  return this.then(
    function (value) {
      return new MyPromise((resolve) => {
        resolve(onFinally())
      }).then(function () {
        return value
      })
    },
    function (reason) {
      return new MyPromise((resolve) => {
        resolve(onFinally())
      }).then(function () {
        throw reason
      })
    }
  )
}

MyPromise.deferred = function () {
  const result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

MyPromise.resolve = function (value) {
  if (value instanceof MyPromise) {
    return value
  }

  return new MyPromise((resolve) => {
    resolve(value)
  })
}

MyPromise.reject = function (reason) {
  return new MyPromise((_resolve, reject) => {
    reject(reason)
  })
}

MyPromise.all = function (values) {
  return new MyPromise((resolve, reject) => {
    const result = []
    const valuesCount = values.length
    let resolveCount = 0

    if (valuesCount === 0) {
      return resolve(result)
    }

    values.forEach((value, index) => {
      const promise = MyPromise.resolve(value)
      promise.then(
        function (v) {
          resolveCount += 1
          result[index] = v

          if (valuesCount === resolveCount) {
            return resolve(result)
          }
        },
        function (r) {
          return reject(r)
        }
      )
    })
  })
}

MyPromise.race = function (values) {
  return new MyPromise((resolve, reject) => {
    values.forEach((value) => {
      const promise = MyPromise.resolve(value)
      promise.then(
        function (v) {
          return resolve(v)
        },
        function (r) {
          return reject(r)
        }
      )
    })
  })
}

MyPromise.allSettled = function (values) {
  return new MyPromise((resolve) => {
    const result = []
    const valuesCount = values.length
    let count = 0

    if (valuesCount === 0) {
      return resolve(result)
    }

    values.forEach((value, index) => {
      const promise = MyPromise.resolve(value)
      // 也可以通过 .then.catch.finally 实现
      promise.then(
        function (v) {
          count += 1
          result[index] = {
            status: FULFILLED.description,
            value: v
          }
          if (count === valuesCount) {
            return resolve(result)
          }
        },
        function (r) {
          count += 1
          result[index] = {
            status: REJECTED.description,
            reason: r
          }

          if (count === valuesCount) {
            return resolve(result)
          }
        }
      )
    })
  })
}

module.exports = MyPromise
