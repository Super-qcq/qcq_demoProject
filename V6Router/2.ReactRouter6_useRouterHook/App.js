import React from 'react'
import {NavLink, useRoutes} from 'react-router-dom'
import Header from './components/Header/Header'
import {routers} from './Routers/Routers'
export default function App(){
  // 根据路由表生成对应的路由规则
  const element = useRoutes(routers)
  function MyNavLink({ isActive }){
    return "list-group-item" + (isActive ? " activeStyle" : "")
  }
  return (
    <div>
      <div className="row">
        <div className="col-xs-offset-2 col-xs-8">
          <div className="page-header">
            {/* 一般组件 */}
            <Header></Header>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-xs-2 col-xs-offset-2">
          <div className="list-group">
            {/* <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} to="/about">About</NavLink>
            <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} to="/home">Home</NavLink> */}
            {/* 将className里面的方法封装起来，封装成MyNavLink，在这直接调用 */}
            <NavLink className={MyNavLink} to="/about">About</NavLink>
            <NavLink className={MyNavLink} to="/home">Home</NavLink>
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

