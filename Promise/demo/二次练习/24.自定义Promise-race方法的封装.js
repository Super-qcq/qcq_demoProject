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
  //异步异常穿透报错的原因是在回调函数中我们没有指定失败的回调，导致失败的回调是一个undefined，之后在改变状态后再执行失败的回调时会报错，每次传递都会报错。解决的办法时 判断当发现失败的回调不存在时就给失败的回调设置默认值为抛出错误
  if (typeof onRejected !== 'function') {
    onRejected = reason => {
      throw reason
    }
  }
  //值传递和异常穿透的原理一样 不过值传递传的是值 不是异常
  if (typeof onResolved !== 'function') {
    onResolved = value => value
  }
  return new Promise((resolve, reject) => {
    //封装then方法 注意保存this
    function callback(type) {
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
//catch方法相当于半个then方法 返回的也是Promise对象 那么就可以调用then方法实现(第一个成功的函数参数不传)
Promise.prototype.catch = function (onRejected) {
  return this.then(undefined, onRejected)
}
//封装Promise.reject和Promise.resolve方法
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
Promise.reject = function (reason) {
  return new Promise((undefined,reject)=>{
    reject(reason)
  })
}
//promise.all方法返回的是一个promise对象，接收的是一个数组 当数组里的任何一个promise对象是失败的则 结果为失败 失败的值是失败的promise对象的值。否则为成功 成功的值为数组中成功的prommise对象的值组成的数组
Promise.all = function(promises){
  return new Promise((resolve,reject)=>{
    //声明一个变量记录数组里元素的个数
    let count = 0
    // 声明一个最后输出成功的结果数组
    const arr = []
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v=>{
        count++
        arr[i] = v //将每个promise对象元素成功的值保存到数组中 
        if(count == promises.length){
          resolve(arr)
        }
        
      },r=>{
        reject(r)
      })
      
    }
  })
}
//race方法的封装：同all方法一样都是接收promise对象的数组但不同的是 race方法返回的是最先改变状态的promise对象的那一个元素，最终的结果值也是最先返回的那个值
Promise.race = function(promises){
  return new Promise((resolve,reject)=>{
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(v=>{//哪个promise对象元素先执行就将最终的返回结果的状态和值 改成先执行的这个，并且只能改变一次无法覆盖
        resolve(v)
      },r=>{
        reject(r)
      })
    }
  })
}