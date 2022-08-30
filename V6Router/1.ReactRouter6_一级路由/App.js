import React,{Component} from 'react'
import {NavLink, Route, Routes} from 'react-router-dom'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
export default class App extends Component{
  render(){
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
                <NavLink className="list-group-item" to="/about">About</NavLink>
                <NavLink className="list-group-item" to="/home">Home</NavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由   路由组件放在pages中 */}
                <Routes>
                 <Route path="/about"element={<About/>}> </Route>
                 <Route path="/home"element={<Home/>}> </Route>
               </Routes>
              </div>
            </div>
          </div>
        </div>
   </div>
    )
  }
}