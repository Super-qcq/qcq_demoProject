function Promise(actuator) {
  this.promiseValue = 'null'
  this.promiseStatus = 'pending'
  this.callbacks = []
  resolve = data => {
    if (this.promiseStatus !== 'pending') return
    this.promiseStatus = 'resolved'
    this.promiseValue = data
    this.callbacks.forEach(element => {
      element.onResolved(this.promiseValue)

    });
  }
  reject = data => {
    if (this.promiseStatus !== 'pending') return
    this.promiseStatus = 'rejected'
    this.promiseValue = data
    for (let index of this.callbacks) {
      index.onRejected(this.promiseValue)
    }

  }
  try {
    actuator(resolve, reject)
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
    onResolved = data => data
  }
  return new Promise((resolve, reject) => {
    function callback(type) {
      try {
        let result = type(that.promiseValue)
        if (result instanceof Promise) {
          result.then(v => {
            resolve(v)
          }, r => {
            reject(r)
          })

        } else {
          resolve(result)
        }
      } catch (e) {
        reject(e)
      }
    }
    if (this.promiseStatus === 'resolved') {
      callback(onResolved)
    }
    if (this.promiseStatus === 'rejected') {
      callback(onRejected)
    }
    if (this.promiseStatus === 'pending') {
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
Promise.resolve = function (result) {
  return new Promise((resolve, reject) => {
    if (result instanceof Promise) {
      result.then(v => {
        resolve(v)
      }, r => {
        reject(r)
      })
    } else {
      resolve(result)
    }
  })
}
Promise.reject = function (result) {
  return new Promise((undefined, reject) => {
    reject(result)
  })
}
Promise.all = function (promises) {
  return new Promise((resolve, reject) => {
    let count = 0
    let arr = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v=>{
        count++
        arr[i] = v
        if(count == promises.length){
          resolve(arr)
        }
        
      },r=>{
        reject(r)
      })

    }
  })
}
Promise.race = function (promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v=>{
        resolve(v)
      },r=>{
        reject(r)
      })

    }
  })
}