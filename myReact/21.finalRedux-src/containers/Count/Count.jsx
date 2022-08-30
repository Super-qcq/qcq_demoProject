import React, { Component } from 'react';
import {connect} from 'react-redux'
import {addAction, unaddAction} from '../../redux/actions/count'
//函数返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value---状态 相当于store.getState()
//函数返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value---操作状态的方法

//优化：将状态和操作对象的方法这两个函数都放入connect中，操作对象的方法可以直接返回对象，自动进行dispatch

class Count extends Component {
  add = () =>{
    const {value} = this.selectValue
    //给容器组件传递数据
    this.props.add(+value)
  }
  unadd = () =>{
    const {value} = this.selectValue
    this.props.unadd(+value)
  }
  oddadd = () =>{
    const {value} = this.selectValue
   if(this.props.count % 2 !==0){
    this.props.add(+value)
   }
  }
  asyncadd = () =>{
    const {value} = this.selectValue
    setTimeout(()=>{
      this.props.add(+value)
    },1000)
  }
  render() {
    return (
      <div>
        <h1>我是Count组件，下方组件总人数为{this.props.personNum.length}</h1>
        {/*api:store.getState()得到store中的状态 */}
        <h2>当前和为：{this.props.count}</h2>
        <select ref={v => this.selectValue = v}>
          <option value = '1'>1</option>
          <option value = '2'>2</option>
          <option value = '3'>3</option>
        </select>&nbsp;
        <button onClick={this.add}>+</button>&nbsp;
        <button onClick={this.unadd}>-</button>&nbsp;
        <button onClick={this.oddadd}>奇数加</button>&nbsp;
        <button onClick={this.asyncadd}>异步加</button>
      </div>
    );
  }
}
//count的容器组件
export default connect(
  //count组件中所需要的this.props.count 为key value形式，value在store中获取 系统自动传了一个state进来  (store.getState())
    // 这里的state.count 和 state.persons 其中的count和persons是store中的 汇总了的reducer的key
  state =>({count:state.count,personNum:state.persons}),
  {
    add:addAction,
    unadd:unaddAction
  }
)(Count)