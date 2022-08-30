function Promise(executer){
  //executer 为一个函数类型的参数
  function resolve(){

  }
  function reject(){

  }
  executer(resolve,reject)
}
Promise.prototype.then = function(onResolved,onReject){

}