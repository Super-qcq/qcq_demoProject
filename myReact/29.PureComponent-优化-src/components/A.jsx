import React, { PureComponent } from 'react';
import B from './B'
import './context.css'
// 问题：
// 1.只要执行setState(),即使不改变状态数据,组件也会重新render() ==>效率低
// 2.只当前组件重新render(),就会自动重新render子组件,纵使子组件没有用到父组件的任何数据==>效率低
class A extends PureComponent {
  state={name:'qcq'}
  update = () =>{
    // this.setState({name:'lr'})
    this.setState({name:['xiaoLiu',...this.state.name]})
  }
  //更新组件的钩子，其实可以传递两个参数，一个是更新前的props,一个是更新前的state,这个钩子默认返回true 控制更新的阀门。可以用这个钩子来控制，当更新前的state和更新后的state相同时，关闭其阀门 不让更新，不让render。
  // shouldComponentUpdate(nextProps,nextState){
  //   if( this.state.name === nextState.name){
  //     return false
  //   }else{
  //     return true
  //   }
  // }
  render() {
    console.log('A组件render了')
    return (
      <div className="parent">
        <h1>我是A组件,我叫{this.state.name}</h1>
        <button onClick={this.update}>点我更新</button>
         <B name={this.state.name}/>
      </div>
    );
  }
}


export default A;