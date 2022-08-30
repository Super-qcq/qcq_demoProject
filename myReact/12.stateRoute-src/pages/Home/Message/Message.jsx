import React, { Component } from 'react'
import {Route,Link} from 'react-router-dom'
import Detail from './Detail/Detail'

export default class Message extends Component {
  state = {
    messageArr: [
      { id: '01', title: '消息1' },
      { id: '02', title: '消息2' },
      { id: '03', title: '消息3' }
    ]
  }
  render() {
    const { messageArr } = this.state
    return (
      <div>
        <ul>
          {
            messageArr.map((items) => {
              return (
                <li key={items.id}>
                 {/* 向路由组件传递state参数 */}
                 <Link to={{pathname : '/home/message/detail',state:{id:items.id,title:items.title}}}>{items.title}</Link>&nbsp;&nbsp;
                </li>
              )
            })
          }
        </ul>
        <hr />
         {/*声明接收state参数,什么都不用做，原始注册路由*/}
          <Route path="/home/message/detail" component={Detail}/>
        </div>
    )
  }
}