setState(stateChange,[callback])....对象式的setState
1.stateChange为状态改变对象（该对象可以体现出状态的更改）
2.callback是可选的回调函数，它在状态更新完毕，界面也更新后（render调用后）才被调用

（2）setState(update,callback)....函数式的setState
1.updater为返回stateChange对象的函数
2.updater可以接收到state和props
3.callback是可选的回调函数，它在状态更新，界面也更新后（render调用后）才被调用。

 //函数式 (不用解构赋值 取出count)
    this.setState((state,props)=>{
      return {count:state.count+1}
    },()=>{
      console.log(this.state.count)
    })
    
总结：1.对象式的setState是函数式的setState的简写方式（语法糖）
2.使用原则 
  (1).如果新状态不依赖原状态===>使用对象方式
  (2).如果新状态依赖于原状态===>使用函数方式
  (3).如果需要在setState()执行后获取最新的函数数据。要在第二个callback函数中读取。