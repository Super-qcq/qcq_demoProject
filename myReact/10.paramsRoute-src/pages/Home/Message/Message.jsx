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
                  {/* 向路由组件传递params参数 */}
                  <Link to={`/home/message/detail/${items.id}/${items.title}`}>{items.title}</Link>&nbsp;&nbsp;
                </li>
              )
            })
          }
        </ul>
        <hr />
          {/* 声明接收params参数   Detail组件会收到所传的数据（id和title）    :后面是携带的参数 */}
          <Route path="/home/message/detail/:id/:title" component={Detail}/>
        </div>
    )
  }
}
