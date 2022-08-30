import React, { PureComponent } from 'react'
import './context.css'
export default class B extends PureComponent {
  render() {
    console.log('B组件render了')
    return (
      <div className="child">
        <h1>我是B组件，A组件的用户名是???</h1>
        {/* 组件嵌套方式1，接收B组件中的文字 */}
        {/* {this.props.children} */}

         {/* 组件嵌套并传递数据 方式2，给A组件当中的数据传到B中，在B中接收 */}
        {this.props.name}
      </div>
    );
  }
}
