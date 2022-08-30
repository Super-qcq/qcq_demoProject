import React, { Component } from 'react'
import { Link, Route, Routes } from 'react-router-dom'
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
                   {/* 嵌套路由：二级导航写全 */}
                  <Link replace to='/home/message/detail'>{items.title}</Link>&nbsp;&nbsp;
                </li>
              )
            })
          }
        </ul>
        <hr />
        <Routes>
           {/* 嵌套路由：二级注册只写子路由 */}
          <Route path="/detail" element={<Detail />}></Route>
        </Routes>
      </div>
    )
  }
}
