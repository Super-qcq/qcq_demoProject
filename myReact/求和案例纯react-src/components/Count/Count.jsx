import React, { Component } from 'react';

class Count extends Component {
  state={
    count:0
  }
  
  add = () =>{
    const {count} = this.state
    const {value} = this.selectValue
    this.setState({count:count+(+value)})
  }
  unadd = () =>{
    const {count} = this.state
    const {value} = this.selectValue
    this.setState({count:count-(+value)})
  }
  oddadd = () =>{
    const {count} = this.state
    const {value} = this.selectValue
   if(count % 2 !==0){
    this.setState({count:count+(+value)})
   }
  }
  asyncadd = () =>{
    const {count} = this.state
    const {value} = this.selectValue
    setTimeout(()=>{
      this.setState({count:count+(+value)})
    },1000)
  }
  render() {
    return (
      <div>
        <h1>当前和为：{this.state.count}</h1>
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

export default Count;