import React, { PureComponent } from 'react'
import './context.css'
export default class B extends PureComponent {
  state={
    // users:[
    //   {name:'qcq',age:24},
    //   {name:'lcw',age:23},
    //   {name:'mbf',age:22},
    //   {name:'lr',age:21},
    // ]
    //子组件出错
    users:'123'
  }
  render() {
    return (
      <div className="child">
        {this.state.users.map((items)=>{
          return <h2>姓名：{items.name}，年龄：{items.age}</h2>
        })}
      </div>
    );
  }
}
