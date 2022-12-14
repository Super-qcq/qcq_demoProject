import React,{Component} from 'react'
import {Link,Route} from 'react-router-dom'
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
              {/* 原生靠a标签跳转 */}
              {/* <a className="list-group-item active" href="./about.html">About</a>
              <a className="list-group-item" href="./home.html">Home</a> */}
                <Link className="list-group-item" to="/about">About</Link>
                <Link className="list-group-item" to="/home">Home</Link>
            </div>
          </div>
          <div className="col-xs-6">
            <div className="panel">
              <div className="panel-body">
                {/* 注册路由   路由组件放在pages中 */}
                <Route path="/about" component={About}/>
									<Route path="/home" component={Home}/>
              </div>
            </div>
          </div>
        </div>
   </div>
    )
  }
}