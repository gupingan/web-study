// 手写符合 Promise/A+ 规范的 Promise，三次机会查看规范手册

// 定义 promise 的状态
const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

function ApPromise(fn) {
  this.state = PENDING
  this.value = null
  this.reason = null

  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  const that = this

  function resolve(value) {
    if (that.state !== PENDING) return
    that.state = FULFILLED
    that.value = value

    that.onFulfilledCallbacks.forEach((callback) => {
      callback(that.value)
    })
  }

  function reject(reason) {
    if (that.state !== PENDING) return
    that.state = REJECTED
    that.reason = reason

    that.onRejectedCallbacks.forEach((callback) => {
      callback(that.reason)
    })
  }

  isFunction(fn) && fn(resolve, reject)
}

ApPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this
  if (this.state === FULFILLED) {
    let promise2 = new ApPromise((resolve, reject) => {
      setTimeout(function () {
        try {
          if (!isFunction(onFulfilled)) {
            resolve(that.value)
          } else {
            let x = onFulfilled(that.value)
            resolvePromise(promise2, x, resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      }, 0)
    })

    return promise2
  }

  if (this.state === REJECTED) {
    let promise2 = new ApPromise((resolve, reject) => {
      setTimeout(function () {
        try {
          if (!isFunction(onRejected)) {
            reject(that.reason)
          } else {
            let x = onRejected(that.reason)
            resolvePromise(promise2, x, resolve, reject)
          }
        } catch (e) {
          reject(e)
        }
      }, 0)
    })

    return promise2
  }

  if (this.state === PENDING) {
    let promise2 = new ApPromise((resolve, reject) => {
      that.onFulfilledCallbacks.push(function () {
        setTimeout(function () {
          try {
            if (!isFunction(onFulfilled)) {
              resolve(that.value)
            } else {
              let x = onFulfilled(that.value)
              resolvePromise(promise2, x, resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        }, 0)
      })

      that.onRejectedCallbacks.push(function () {
        setTimeout(function () {
          try {
            if (!isFunction(onRejected)) {
              reject(that.reason)
            } else {
              let x = onRejected(that.reason)
              resolvePromise(promise2, x, resolve, reject)
            }
          } catch (e) {
            reject(e)
          }
        }, 0)
      })
    })

    return promise2
  }
}

function isFunction(fn) {
  return typeof fn === 'function'
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(
      new TypeError('The promise and the return value are the same')
    )
  }

  if (x instanceof ApPromise) {
    x.then(
      function (y) {
        resolvePromise(promise, y, resolve, reject)
      },
      function (r) {
        reject(r)
      }
    )
  } else if (isFunction(x) || typeof x === 'object') {
    if (x === null) {
      return resolve(x)
    }

    let then

    try {
      then = x.then
    } catch (e) {
      return reject(e)
    }

    if (isFunction(then)) {
      let called = false
      try {
        then.call(
          x,
          function (y) {
            if (called) return
            called = true
            resolvePromise(promise, y, resolve, reject)
          },
          function (r) {
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

ApPromise.deferred = function () {
  const result = {}
  result.promise = new ApPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = ApPromise
