import React, { PureComponent } from 'react'
import './context.css'
export default class B extends PureComponent {
  //当A组件没有给B组件传递数据时，B组件也可以用这个阀门去判断，当没有传递数据或者两次传递数据相同时，关闭其阀门。
  // shouldComponentUpdate(nextProps,nextState){
  //   if( this.props.name === nextProps.name){
  //     return false
  //   }else{
  //     return true
  //   }
  // }
  render() {
    console.log('B组件render了')
    return (
      <div className="child">
        <h1>我是B组件，A组件的用户名是???</h1>
      </div>
    );
  }
}
