function Promise(executer){
  //executer为函数类型的参数
  //以下两个属性是实例对象的  所以用this
  this.PromiseStatus = 'pending'
  this.PromiseValue = null
  //用箭头函数的原因是 保存实例函数的this，下面函数的this指的是window
  const resolve=data=>{
    //做两个事情1.改变对象的状态 2.设置对象的结果值
    this.PromiseStatus = 'resolved'
    this.PromiseValue = data
  }
  const reject=data=>{
     //做两个事情1.改变对象的状态 2.设置对象的结果值
    this.PromiseStatus = 'rejected'
    this.PromiseValue = data
  }
  executer(resolve,reject)//执行器函数在内部是同步调用的，其次两个参数也是函数类型
}
Promise.prototype.then = function(onResolved,onReject){

}