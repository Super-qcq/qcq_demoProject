import React, { Component, Fragment } from 'react'
import A from './components/A'
import B from './components/B'
export default class App extends Component {
  render() {
    return (
      <Fragment>
        {/* 组件嵌套方式1 */}
        {/* <A>
          <B>1111</B>
        </A> */}

        {/* 组件嵌套并传递数据 方式2，给A组件先传一个函数,A组件将要传给B组件的数据 先通过函数先给App组件 再传给B组件 */}
        <A render = {(data)=>{return <B name={data}></B>}}/>
        {/* < A render={(data)=><B data={data}></B>}></A>  */}
      </Fragment>
    )
  }
}
