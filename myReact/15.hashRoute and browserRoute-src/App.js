import React,{Component} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import About from './pages/About/About'
import Home from './pages/Home/Home'
import Header from './components/Header/Header'
import MyNavLink from './components/MyNavLink/MyNavLink'
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
                <MyNavLink to="/home">Home</MyNavLink>
                <MyNavLink to="/about">About</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
               {/*嵌套路由： 一级注册路由在path后面加/* */}
              <Routes>
                 <Route path="/about/*"element={<About/>}></Route>
                 <Route path="/home/*"element={<Home/>}> </Route>
                 <Route path="*" element={<Navigate to="/about" />} />
               </Routes>
              </div>
            </div>
          </div>
        </div>
   </div> 
    )
  }
}