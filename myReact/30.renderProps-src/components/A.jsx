import React, { PureComponent } from 'react';
// import B from './B'
import './context.css'
class A extends PureComponent {
  state={name:'qcq'}
  render() {
    return (
      <div className="parent">
        <h1>我是A组件,我叫{this.state.name}</h1>
        {/* 组件嵌套方式1，接收A中的B组件 */}
         {/* {this.props.children} */}

          {/* 组件嵌套并传递数据 方式2，给A组件当中的数据传到B中,这里要的是App中函数的返回值，返回的是B组件 将B组件放在这里 */}
          {this.props.render(this.state.name)}
      </div>
    );
  }
}


export default A;