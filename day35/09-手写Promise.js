const pending = Symbol('pending')
const fulfilled = Symbol('fulfilled')
const rejected = Symbol('rejected')

function MyPromise(fn) {
  this.state = pending
  this.value = null
  this.reason = null

  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  const that = this

  function resolve(value) {
    if (that.state === pending) {
      that.state = fulfilled
      that.value = value

      that.onFulfilledCallbacks.forEach((callback) => {
        callback(that.value)
      })
    }
  }

  function reject(reason) {
    if (that.state === pending) {
      that.state = rejected
      that.reason = reason

      that.onRejectedCallbacks.forEach((callback) => {
        callback(that.reason)
      })
    }
  }

  try {
    fn && fn(resolve, reject)
  } catch (error) {
    this.reject(error)
  }
}

MyPromise.prototype.then = function (onFulfilled, onRejected) {
  let realOnFulfilled = onFulfilled
  if (typeof onFulfilled !== 'function') {
    realOnFulfilled = function (value) {
      return value
    }
  }

  let realOnRejected = onRejected
  if (typeof onRejected !== 'function') {
    realOnRejected = function (reason) {
      if (reason instanceof Error) {
        return reason
      } else {
        return new Error(reason)
      }
    }
  }

  const that = this

  if (this.state === fulfilled) {
    const otherPromise = new MyPromise((resolve, reject) => {
      setTimeout(function () {
        try {
          if (typeof onFulfilled !== 'function') {
            resolve(that.value)
          } else {
            let retValue = realOnFulfilled(that.value)
            resolvePromise(otherPromise, retValue, resolve, reject)
          }
        } catch (error) {
          reject(error)
        }
      }, 0)
    })

    return otherPromise
  }

  if (this.state === rejected) {
    const otherPromise = new MyPromise((resolve, reject) => {
      setTimeout(function () {
        try {
          if (typeof onRejected !== 'function') {
            reject(that.reason)
          } else {
            let retValue = realOnRejected(that.reason)
            resolvePromise(otherPromise, retValue, resolve, reject)
          }
        } catch (error) {
          reject(error)
        }
      }, 0)
    })
    return otherPromise
  }

  if (this.state === pending) {
    const otherPromise = new MyPromise((resolve, reject) => {
      that.onFulfilledCallbacks.push(function () {
        setTimeout(function () {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(that.value)
            } else {
              let retValue = realOnFulfilled(that.value)
              resolvePromise(otherPromise, retValue, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        }, 0)
      })
      that.onRejectedCallbacks.push(function () {
        setTimeout(function () {
          try {
            if (typeof onRejected !== 'function') {
              reject(that.reason)
            } else {
              let retValue = realOnRejected(that.reason)
              resolvePromise(otherPromise, retValue, resolve, reject)
            }
          } catch (error) {
            reject(error)
          }
        }, 0)
      })
    })

    return otherPromise
  }
}

function resolvePromise(promise, retValue, resolve, reject) {
  if (promise === retValue) {
    return reject(
      new TypeError('The promise and the return value are the same')
    )
  }

  if (retValue instanceof MyPromise) {
    retValue.then(function (ret) {
      resolvePromise(promise, ret, resolve, reject)
    }, reject)
  } else if (typeof retValue === 'object' || typeof retValue === 'function') {
    if (retValue === null) {
      return resolve(retValue)
    }

    let then
    try {
      then = retValue.then
    } catch (error) {
      return reject(error)
    }

    if (typeof then === 'function') {
      let called = false

      try {
        then.call(
          retValue,
          function (ret) {
            if (called) return
            called = true
            resolvePromise(promise, ret, resolve, reject)
          },
          function (reason) {
            if (called) return
            called = true
            reject(reason)
          }
        )
      } catch (error) {
        if (called) return
        reject(error)
      }
    } else {
      resolve(retValue)
    }
  } else {
    resolve(retValue)
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
