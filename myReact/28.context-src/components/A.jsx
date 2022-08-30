import React, { Component } from 'react';
import B from './B'
import './context.css'
//导入myContext的声明
import {myContext} from './myContext'
class A extends Component {
  state={name:'qcq', age:24}
  render() {
    const {name,age} = this.state
    return (
      <div className="parent">
        <h1>我是A组件，我的用户名是{name}</h1>
        {/* 将要传递的数据用myContext.Provider value={}传 里面包裹要传递的子组件，只传这一级，后代谁要用这个数据接收就可以 */}
        <myContext.Provider value = {{name,age}}>
          <B/>
        </myContext.Provider>
      </div>
    );
  }
}


export default A;