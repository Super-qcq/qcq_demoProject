import React, { Component } from 'react'
import { Routes ,Route ,Navigate} from 'react-router-dom'
import MyNavLink from '../../components/MyNavLink/MyNavLink'
import News from './News/News'
import Message from './Message/Message'
export default class Home extends Component {
  render() {
    // console.log(this.props)
    return (
      <div>
         <h2>Home组件内容</h2>
              <div>
                <ul className="nav nav-tabs">
                  <li>
                    {/* 嵌套路由：二级导航写全 */}
                    <MyNavLink to="/home/news">News</MyNavLink>
                  </li>
                  <li>
                    <MyNavLink to="/home/message">Message</MyNavLink>
                  </li>
                </ul>
                <ul>
                <Routes>
                  {/* 嵌套路由：二级注册只写子路由 */}
                  {/*嵌套路由： 一级注册路由在path后面加/* */}
                 <Route path="/news/*"element={<News/>}></Route>
                 <Route path="/message/*"element={<Message/>}></Route>
                 {/* 重定向 */}
                 <Route path="*" element={<Navigate to="/home/message" />} />
               </Routes>
                </ul>
              </div>
      </div>
    )
  }
}
