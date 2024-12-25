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

MyPromise.deferred = function () {
  const result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
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

module.exports = MyPromise
