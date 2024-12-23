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
      })
      that.onRejectedCallbacks.push(function () {
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

}

module.exports = MyPromise
