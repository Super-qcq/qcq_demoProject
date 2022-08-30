// import React, { Component } from 'react'
// import './context.css'
// //导入myContext的声明
// import {myContext} from './myContext' 
// export default class C extends Component {
//   // 接收myContext
//   static contextType = myContext
//   render() {
//     return (
//       <div className="grand">
//         <h1>我是C组件，A组件的用户名是{this.context.name},年龄是{this.context.age}</h1>
//       </div>
//     );
//   }
// }
import React from 'react'
import './context.css'
//导入myContext的声明
import {myContext} from './myContext' 
export default function C() {
  return (
          <div className="grand">
            <h1>
              <myContext.Consumer>
                {
                  value=>{
                    return `我是C组件，A组件的姓名是${value.name}，年龄是${value.age}`
                  }
                }
              </myContext.Consumer>
            </h1>
          </div>
        );
}

