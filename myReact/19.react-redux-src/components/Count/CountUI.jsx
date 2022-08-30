import React, { Component } from 'react';
class CountUI extends Component {
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
    //从容器组件中获取状态
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

export default CountUI;