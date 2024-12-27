const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

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

    that.onFulfilledCallbacks.forEach((callback) => {
      callback(that.value)
    })
  }

  function reject(reason) {
    if (that.state !== PENDING) return

    that.reason = reason
    that.state = REJECTED

    that.onRejectedCallbacks.forEach((callback) => {
      callback(that.reason)
    })
  }

  try {
    fn(resolve, reject)
  } catch (e) {
    reject(e)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  const that = this

  if (this.state === FULFILLED) {
    let promise2 = new MyPromise((resolve, reject) => {
      setTimeout(function () {
        try {
          if (typeof onFulfilled !== 'function') {
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
    let promise2 = new MyPromise((resolve, reject) => {
      setTimeout(function () {
        try {
          if (typeof onRejected !== 'function') {
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
    let promise2 = new MyPromise((resolve, reject) => {
      that.onFulfilledCallbacks.push(function () {
        setTimeout(function () {
          try {
            if (typeof onFulfilled !== 'function') {
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
            if (typeof onRejected !== 'function') {
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

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    return reject(new TypeError('promise and return value are the same'))
  }

  if (x instanceof MyPromise) {
    x.then(function (y) {
      resolvePromise(promise, y, resolve, reject)
    }, reject)
  } else if (x === null) {
    resolve(null)
  } else if (typeof x === 'function' || typeof x === 'object') {
    let then = null
    try {
      then = x.then
    } catch (e) {
      return reject(e)
    }

    if (typeof then == 'function') {
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

MyPromise.deferred = function () {
  const result = {}
  result.promise = new MyPromise((resolve, reject) => {
    result.resolve = resolve
    result.reject = reject
  })
  return result
}

module.exports = MyPromise
