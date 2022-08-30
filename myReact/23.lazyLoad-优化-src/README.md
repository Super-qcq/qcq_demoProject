用的时候再加载，最多的就是路由组件的懒加载，
将需要进行懒加载的组件用如下方式导入
import React,{Component, lazy} from 'react'
const Home = lazy(() => import('./pages/Home/Home'))  
const About = lazy(() => import('./pages/About/About')) 

如果还未加载出来 要给定加载中的样式
<React.Suspense fallback = {<Loading/>}>
						{/* 注册路由   路由组件放在pages中 */}
						<Route path="/about" component={About}/>
						<Route path="/home" component={Home}/>
					</React.Suspense>