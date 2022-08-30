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
    for(let index of this.callbacks){
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
    for(let index of this.callbacks){
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
  //由于状态和值是实例对象自身的，所以这里用this.PromiseStatus的方法来判断状态和用this.PromiseValue来输出值
  if (this.PromiseStatus === 'resolved') {
    onResolved(this.PromiseValue)
  }
  if (this.PromiseStatus === 'rejected') {
    onRejected(this.PromiseValue)
  }
  //异步任务在这里不会直接输出结果，因为当指定回调时，异步任务的状态没有改变是pending，在这里没有对pending状态做出输出
  //异步任务的回调顺序是：先指定回调，再改变状态，再执行回调函数。所以在这里不能直接执行，而是将要执行的回调函数保存下来，当状态改变之后，再到改变状态后的函数中执行回调函数

  //由于异步任务要执行多个回调的话 后面的回调会把上一个覆盖没有结果，所以将要保存的回调 this.callbacks对象变成数组 将回调函数对象往里添加，有几个加几个。这样在状态改变后执行时要进行遍历
  if (this.PromiseStatus === 'pending') {
    this.callbacks.push({
      onResolved,
      onRejected
    })
  }

}