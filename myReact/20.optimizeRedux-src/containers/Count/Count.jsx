import React, { Component } from 'react';
import {connect} from 'react-redux'
import {addAction, unaddAction} from '../../redux/count_action'
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
        {/*api:store.getState()得到store中的状态 */}
        <h1>当前和为：{this.props.count}</h1>
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
export default connect(
  state =>({count:state}),
  // dispatch =>{
  //   return {
  //     //通知redux执行加法,将action分发给redux action中的内容在count_action中
  //     add:number=>dispatch(addAction(number)),
  //     unadd:number=>dispatch(unaddAction(number))
  //   }
  // }
  {
    add:addAction,
    unadd:unaddAction
  }
)(Count)