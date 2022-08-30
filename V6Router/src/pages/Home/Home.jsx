import React from 'react'
import MyNavLink from '../../components/MyNavLink/MyNavLink'
import {Outlet} from 'react-router-dom'
export default function Home() {
  return (
    <div>
      <h3>我是Home的内容</h3>
      <div>
        <ul className="nav nav-tabs">
          <li>
            {/* 只写当前路径，前面有父级路径不需要写/，否则会在根目录下找 */}
            <MyNavLink to="news">News</MyNavLink>
          </li>
          <li>
            <MyNavLink to="message">Message</MyNavLink>
          </li>
        </ul>
        {/* 注册路由,Outlet指定路由组件呈现的位置*/}
        <Outlet/>
      </div>
    </div>
  )
}

