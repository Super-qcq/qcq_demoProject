import React,{Component} from 'react'
import { Route, Switch, Redirect} from 'react-router-dom'
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
              {/* 原生靠a标签跳转 */}
              {/* <a className="list-group-item active" href="./about.html">About</a>
              <a className="list-group-item" href="./home.html">Home</a> */}
              {/* NavLink的高亮效果，点击哪个 哪个就为高亮*/}
                {/* <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} to="/about">About</NavLink>
                <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} to="/home">Home</NavLink> */}
                {/* 1.调用封装的MyNavLink 可以使得相同的成分只写一遍 */}
                <MyNavLink to="/home">Home</MyNavLink>
                {/* 2.加了不存在的路径时 样式会丢失，解决方法就是去掉css路径中的点，不在当前路径下寻找 */}
                {/* <MyNavLink to="/a/home">Home</MyNavLink> */}
                <MyNavLink to="/about">About</MyNavLink>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由   路由组件放在pages中 */}
                 <Switch>
                 <Route path="/about" component={About}/>
									<Route path="/home" component={Home}/>
                    {/* 重定向 */}
                    <Redirect to="/about"/>
                  </Switch>
              </div>
            </div>
          </div>
        </div>
   </div> 
    )
  }
}