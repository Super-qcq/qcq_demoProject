function Promise(executer) {
  this.PromiseStatus = 'pending'
  this.PromiseValue = null
  this.callbacks = []
  resolve = (data) => {
    if (this.PromiseStatus !== 'pending') return
    this.PromiseStatus = 'resolved'
    this.PromiseValue = data
    setTimeout(() => {
      for (let index of this.callbacks) {
        index.onResolved(data)
      }
    }, 0);
  }
  reject = (data) => {
    if (this.PromiseStatus !== 'pending') return
    this.PromiseStatus = 'rejected'
    this.PromiseValue = data
    this.PromiseValue = data
    setTimeout(() => {
      for (let index of this.callbacks) {
        index.onRejected(data)
      }
    }, 0);
  }
  try {
    executer(resolve, reject)
  } catch (e) {
    reject(e)
  }
}
Promise.prototype.then = function (onResolved, onRejected) {
  let that = this
  if (typeof onRejected !== 'function') {
    onRejected = data => {
      throw data
    }
  }
  if (typeof onResolved !== 'function') {
    onResolved = data => {
      return data
    }
  }
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        const res = type(that.PromiseValue)
        if (res instanceof Promise) {
          res.then(v => {
            resolve(v)
          }, r => {
            reject(r)
          })
        } else {
          resolve(res)
        }

      } catch (e) {
        reject(e)
      }
    }
    if (this.PromiseStatus === 'resolved') {
      setTimeout(() => {
        callback(onResolved)
      }, 0);
    }
    if (this.PromiseStatus === 'rejected') {
      setTimeout(() => {
        callback(onRejected)
      }, 0);
    }
    if (this.PromiseStatus === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          callback(onResolved)
        },
        onRejected: function () {
          callback(onRejected)
        }
      })
    }
  })


}
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
Promise.resolve = function (value) {
  return new Promise((resolve, reject) => {
    if (value instanceof Promise) {
      value.then(v => {
        resolve(v)
      }, r => {
        reject(r)
      })

    } else {
      resolve(value)
    }
  })
}
Promise.reject = function (value) {
  return new Promise((undefined, reject) => {
    reject(value)
  })
}
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    const arr = []
    let num = 0
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v => {
        num++
        arr[num] = v
        if (num == promises.length) {
          resolve(arr)
        }

      }, r => {
        reject(promises[i])
      })

    }
  })
}
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v => {
        resolve(v)
      }, r => {
        reject(r)
      })
    }
  })
}