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
  const that = this
  return new Promise((resolve, reject) => {
    //封装then方法 注意保存this
    function callback(type){
      try {
        let result = type(that.PromiseValue) //第三步
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
    if (this.PromiseStatus === 'resolved') {
      callback(onResolved)
    }
    if (this.PromiseStatus === 'rejected') {
      callback(onRejected)
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