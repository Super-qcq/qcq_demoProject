(function person(w){
  //匿名函数自调用+闭包的模块化
  let name = 'qcq'
  function setName(){
    console.log(`我的名字叫${name}`)
  }
  w.module = {
    name,
    setName
  }
})(window)