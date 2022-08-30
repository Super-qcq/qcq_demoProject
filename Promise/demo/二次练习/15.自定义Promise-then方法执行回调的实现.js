function Promise(executer){
  //executer为函数类型的参数
  //以下两个属性是实例对象的  所以用this
  this.PromiseStatus = 'pending'
  this.PromiseValue = null
  //用箭头函数的原因是 保存实例函数的this，下面函数的this指的是window
  const resolve=data=>{
    // 判断状态：如果状态已经改过，就不能再改了
    if(this.PromiseStatus !== 'pending') return
    //做两个事情1.改变对象的状态 2.设置对象的结果值
    this.PromiseStatus = 'resolved'
    this.PromiseValue = data
  }
  const reject=data=>{
    // 判断状态：如果状态已经改过，就不能再改了
    if(this.PromiseStatus !== 'pending') return
     //做两个事情1.改变对象的状态 2.设置对象的结果值
    this.PromiseStatus = 'rejected'
    this.PromiseValue = data
  }
  try{//捕获抛出的错误，错误放在catch里面处理，代码区如果有错误就会返回异常的处理结果
    executer(resolve,reject)//执行器函数在内部是同步调用的，其次两个参数也是函数类型
  }catch(e){
    reject(e)
  }
}
Promise.prototype.then = function(onResolved,onReject){
  //由于状态和值是实例对象自身的，所以这里用this.PromiseStatus的方法来判断状态和用this.PromiseValue来输出值
  if(this.PromiseStatus === 'resolved'){
    onResolved(this.PromiseValue)
  }
  if(this.PromiseStatus === 'rejected'){
    onReject(this.PromiseValue)
  }
}