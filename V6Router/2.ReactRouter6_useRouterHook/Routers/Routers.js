import {Navigate} from 'react-router-dom'
import About from '../pages/About/About'
import Home from '../pages/Home/Home'
//路由表 键值对
export const routers = [
  {
    path:'/about',
    element: <About/>
  },
  {
    path:'/home',
    element: <Home/>
  },
  {
    path:'/',
    element:<Navigate to="/home"></Navigate>
  }
]