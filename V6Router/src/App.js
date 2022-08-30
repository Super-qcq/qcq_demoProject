import React from 'react'
import {useRoutes, useNavigate } from 'react-router-dom'
import Header from './components/Header/Header'
// 引入路由表
import {routers} from './Routers/Routers'
import MyNavLink from './components/MyNavLink/MyNavLink'
export default function App(){
  // 根据路由表生成对应的路由规则
  const element = useRoutes(routers)
  // 编程式路由导航 useNavigate进行前进和后退
  const navigate = useNavigate()
  function back(){
    navigate(-1)
  }
  function forward(){
    navigate(1)
  }
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header">
            {/* 一般组件 */}
            <Header></Header>
            <button onClick={back}>{'<==后退'}</button>&nbsp;&nbsp;
            <button onClick={forward}>{'前进==>'}</button>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* 子级路由如果匹配了，自己本身会失去高亮 */}
            <MyNavLink to="/about">About</MyNavLink>
            <MyNavLink end to="/home">Home</MyNavLink>
          </div>
        </div>
        <div className="col-xs-6">
          <div className="panel">
            <div className="panel-body">
              {/* 注册路由   路由组件放在pages中 */}
              {element}
            </div>
          </div>
        </div>
      </div>
 </div>
  )
}

