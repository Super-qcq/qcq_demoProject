{/* end 子级路由如果匹配了，自己本身会失去高亮 */}
              <NavLink className="list-group-item" to="/about">About</NavLink>
              <NavLink className="list-group-item" end to="/home">Home</NavLink>

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


路由导航 路径to只需要写组件路径，不用/ 和父路由
{/* 只写当前路径，前面有父级路径不需要写/，否则会在根目录下找 */}
            <MyNavLink to="news">News</MyNavLink>

            

在需要放子路由的地方，用Outlet呈现
 {/* 注册路由,Outlet指定路由组件呈现的位置*/}
       <Outlet/>


路由组件之间的传递消息,传递Params参数
1.父组件中导航连接，将消息用/分割：
<li key={items.id}>
              <Link to={`detail/${items.id}/${items.title}/${items.content}`}>{items.title}</Link>&nbsp;&nbsp;
            </li> 
2.注册路由时接收参数在路由表中 用/:分割：  在注册路由的地方用<Outlet/>呈现
// message下的子组件detail,给路由组件传递数据
      children:[{
        path:'detail/:id/:title/:content',
        element:<Detail/>
      }]
3.在子组件中用useParams()接收params参数：

<div>
      <li>id:{useParams().id}</li>
      <li>标题:{useParams().title}</li>
      <li>内容:{useParams().content}</li>
    </div>