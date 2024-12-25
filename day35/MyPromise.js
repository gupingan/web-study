// 手写 Promise/A+ 不允许查看规范

const PENDING = Symbol('pending')
const FULFILLED = Symbol('fulfilled')
const REJECTED = Symbol('rejected')

class MyPromise {
  constructor(fn) {
    this.state = PENDING
    this.value = null
    this.reason = null

    this.onFulfilledCallbacks = []
    this.onRejectedCallbacks = []

    typeof fn === 'function' && fn(this.resolve.bind(this), this.reject.bind(this))
  }

  resolve(value) {
    if (this.state !== PENDING) return

    this.value = value
    this.state = FULFILLED

    this.onFulfilledCallbacks.forEach((cb) => cb(this.value))
  }

  reject(reason) {
    if (this.state !== PENDING) return

    this.reason = reason
    this.state = REJECTED

    this.onRejectedCallbacks.forEach((cb) => cb(this.reason))
  }

  then(onFulfilled, onRejected) {
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

  static deferred() {
    const result = {}
    result.promise = new MyPromise((resolve, reject) => {
      result.resolve = resolve
      result.reject = reject
    })
    return result
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

module.exports = MyPromise
