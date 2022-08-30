import {Navigate} from 'react-router-dom'
import About from '../pages/About/About'
import Home from '../pages/Home/Home'
import News from '../pages/Home/News/News'
import Message from '../pages/Home/Message/Message'
import Detail from '../pages/Home/Message/Detail/Detail'
//路由表 键值对
export const routers = [
  {
    path:'/about',
    element: <About/>
  },
  {
    path:'/home',
    element: <Home/>,
    //Home组件下的子组件，前面有父级路径不需要写/，否则会在根目录下找
    children:[{
      path:'news',
      element:<News/>
    },{
      path:'message',
      element:<Message/>,
      // message下的子组件detail,给路由组件传递数据
      children:[{
        path:'detail/:id/:title/:content',
        element:<Detail/>
      }]
    }]
  },
  {
    path:'/',
    element:<Navigate to="/home"></Navigate>
  }
]