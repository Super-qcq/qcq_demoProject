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
  //同步修改then方法的返回结果：1.首先then方法返回的是一个promise对象 2.然后如果改变状态后执行的是成功的回调函数，那么就在成功的回调里面return结果，反之在失败的回调里面return结果 3.接收回调函数返回的结果 判断，如果是非promise类型，则调用resolve()方法，成功的结果为接收回调函数返回的结果；如果是promise类型的数据，则调用then()方法，因为promise类型可以调用then方法判断，如果如果promise类型数据为成功，则执行resolve，值为传到then里面回调函数的值。4.如果抛出异常则对 整个成功的回调函数下进行try catch判断，当回调函数接收的值为 抛出的异常时就会交给catch来处理，在catch里面调用reject()来接收抛出的异常值
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
    if (this.PromiseStatus === 'pending') {
      this.callbacks.push({
        onResolved,
        onRejected
      })
    }
  })

}