react-redux的基本使用：
在react中用redux集中式的状态管理。
1.所有的UI组件都应该包裹一个容器组件，他们是父子关系
2.容器组件是真正和redux打交道的，里面可以随意的使用redux的api
3.UI组件中不能使用任何的redux的api
4.容器组件会传给UI组件：（1）redux中所保存的状态 （2）用于操作状态的方法
5.备注：容器给UI传递：状态、操作状态的方法，均通过props传递


UI组件是写页面的 UI组件与redux的交互都要通过容器组件来完成
容器与redux之间 通过store.getState()和store.dispatch(action)来操作


UI组件一般放在components,容器组件一般放在containers中,是一个桥梁联系redux和UI组件
容器组件需要借助react-redux这个库来创建

1.cnpm add react-redux
2.引入UI组件
3.引入store 在上一层通过props传给容器Count（app中引入store  后<Count store={store}/>）避免了多个需要store的容器组件，不断地引入store.
4.容器组件引入connect用于连接UI组件与redux import {connect} from 'react-redux'
5.传入UI组件并暴露出去先让容器组件和UI组件产生联系export default connect()(CountUI)
6.在App中引入容器Count （对应3）

容器组件给UI组件传递数据 父给子传 ，由于父子组件是由connect实现的，没有机会写成<CountUI a='1'/>key,value的形式，且connect的传递方式为传递函数。
所以可以在函数中返回key,value的形式，如下
//a函数返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value---状态
function a(){
  return {n:900}
}
//b函数返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value---操作状态的方法
function b(){
  return {add:()=>{console.log(1)}}
}
export default connect(a,b)(CountUI)


当redux调用a函数的时候已经通过app帮我们把store传给了容器组件只要接收即可(相当于store.getState() api),递给UI组件就行
function a(state){
  return {count:state}
}
当redux调用b函数的时候已经把操作状态的方法传给了容器组件只要接收即可,递给UI组件就行
function b(dispatch){
  return {add:(number)=>{
    dispatch({type:'add',data:number})
  }}
}
优化：
function mapStateToProps(state){
  return {count:state}
}
function mapDispatchToProps(dispatch){
  return {add:number=>
    dispatch(addAction(number))
  }}
}
