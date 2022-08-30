function Promise(executer) {
  //executer为函数类型的参数
  //以下两个属性是实例对象的  所以用this
  this.PromiseStatus = 'pending'
  this.PromiseValue = null
  this.callbacks = []
  //用箭头函数的原因是 保存实例函数的this，下面函数的this指的是window
  const resolve = data => {
    // 判断状态：如果状态已经改过，就不能再改了
    if (this.PromiseStatus !== 'pending') return
    //做两个事情1.改变对象的状态 2.设置对象的结果值
    this.PromiseStatus = 'resolved'
    this.PromiseValue = data
    // 当改变状态是异步执行时，在改变完状态后执行回调（状态为成功的回调在这里执行）
    // if (this.callbacks.onResolved) {
    //   this.callbacks.onResolved(data)
    // }
    //
    for (let index of this.callbacks) {
      index.onResolved(data)
    }
  }
  const reject = data => {
    // 判断状态：如果状态已经改过，就不能再改了
    if (this.PromiseStatus !== 'pending') return
    //做两个事情1.改变对象的状态 2.设置对象的结果值
    this.PromiseStatus = 'rejected'
    this.PromiseValue = data
    // 当改变状态是异步执行时，在改变完状态后执行回调（状态为失败的回调在这里执行）
    // if (this.callbacks.onRejected) {
    //   this.callbacks.onRejected(data)
    // }
    for (let index of this.callbacks) {
      index.onRejected(data)
    }
  }
  try { //捕获抛出的错误，错误放在catch里面处理，代码区如果有错误就会返回异常的处理结果
    executer(resolve, reject) //执行器函数在内部是同步调用的，其次两个参数也是函数类型
  } catch (e) {
    reject(e)
  }
}
Promise.prototype.then = function (onResolved, onRejected) {
  return new Promise((resolve, reject) => { //第一步
    if (this.PromiseStatus === 'resolved') {
      try {
        let result = onResolved(this.PromiseValue) //第三步
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
    if (this.PromiseStatus === 'rejected') {
      onRejected(this.PromiseValue)
    } 
    //异步修改then方法的返回结果：由于回调函数的状态是pending，回调函数会进入这个pending的这个处理函数，但是回调函数里面返回的Promise对象 这个处理函数由于没有调用上面返回Promise对象的resolve和reject函数处理 所以回调函数最终返回的是一个pending状态   1.由于异步任务的回调执行在改变状态后执行，所以由于上面的状态改变后对回调函数的调用执行导致下面的onResolved回调函数也可以被调用执行  2.直接执行onResolved回调函数并接收返回值  3.其余步骤和 同步修改then方法的返回结果 相同,注意要保存this
    const that = this
    if (this.PromiseStatus === 'pending') {
      this.callbacks.push({
        onResolved: function () {
          try {
            let result = onResolved(that.PromiseValue)
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
        },
        onRejected: function () {
          try {
            let result = onRejected(that.PromiseValue)
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
      })
    }
  })

}