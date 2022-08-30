{/* end 子级路由如果匹配了，自己本身会失去高亮 */}
             <NavLink className={MyNavLink} to="/about">About</NavLink>
            <NavLink className={MyNavLink} end to="/home">Home</NavLink>

路由导航 路径to只需要写组件路径，不用/ 和写父路由
{/* 只写当前路径，前面有父级路径不需要写/，否则会在根目录下找 */}
            <MyNavLink to="news">News</MyNavLink>

路由表中将所有的子路由 放在对应的父级路由下：
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
      element:<Message/>
    }]
  },
  {
    path:'/',
    element:<Navigate to="/home"></Navigate>
  }
]




          
在需要放子路由的地方，用Outlet呈现
 {/* 注册路由,Outlet指定路由组件呈现的位置 注意有子路由的组件*/}
       <Outlet/>



高亮封装MyNavLink：（activeStyle是自己指定的高亮类名）
在MyNavLink组件中 引入NavLink，用this.props接收即可：
<NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} {...this.props} />

展示导航的使用方式：<MyNavLink to="news">News</MyNavLink>
 