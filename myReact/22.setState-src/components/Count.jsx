import React, { Component } from 'react'

export default class Count extends Component {
  state = {count:0}
  add = () =>{
    // //对象式
    // const {count} = this.state
    // //callback是可选的回调函数，它在状态更新完毕，界面也更新后（render调用后）才被调用
    // this.setState({count:count+1},()=>{
    //   console.log(this.state.count)
    // })
    //函数式 (不用解构赋值 取出count)
    this.setState((state,props)=>{
      return {count:state.count+1}
    },()=>{
      console.log(this.state.count)
    })
  }
  render() {
    return (
      <div>
        <h1>当前的和为{this.state.count}</h1>
        <button onClick={this.add}>点我+1</button>
      </div>
    )
  }
}
