	import React,{Component, lazy} from 'react'
	import {NavLink,Route} from 'react-router-dom'
	import Header from './components/Header/Header'
	import Loading from './pages/Loading/Loading'
	// import About from './pages/About/About'
	// import Home from './pages/Home/Home'
  // 将需要懒加载的组件导入
	const Home = lazy(() => import('./pages/Home/Home'))  
	const About = lazy(() => import('./pages/About/About')) 

	export default class App extends Component{
	render(){
		return (
		<div>
			<div className="row">
			<div className="col-xs-offset-2 col-xs-8">
				<div className="page-header">
				<Header></Header>
				</div>
			</div>
			</div>
			<div className="row">
			<div className="col-xs-2 col-xs-offset-2">
				<div className="list-group">
					<NavLink activeClassName="activeStyle" className="list-group-item" to="/home">Home</NavLink>
					<NavLink activeClassName="activeStyle" className="list-group-item" to="/about">About</NavLink>
				</div>
			</div>
			<div className="col-xs-6">
				<div className="panel">
				<div className="panel-body">
          {/* 当未加载出来时，指定该显示什么 */}
					<React.Suspense fallback = {<Loading/>}>
						{/* 注册路由   路由组件放在pages中 */}
						<Route path="/about" component={About}/>
						<Route path="/home" component={Home}/>
					</React.Suspense>
				</div>
				</div>
			</div>
			</div>
	</div>
		)
	}
	}