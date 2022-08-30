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


路由组件之间的传递消息,传递Search参数
1.父组件中导航连接，将消息用?id=${items.id}&title=${items.title}分割：
 <li key={items.id}>
              <Link to={`detail?id=${items.id}&title=${items.title}&content=${items.content}`}>{items.title}</Link>&nbsp;&nbsp;
            </li>
2.注册路由时不用接收参数在路由表中   在注册路由的地方用<Outlet/>呈现

3.在子组件中用useSearchParams接收search参数：

  //useSearchParams()的用法形似于useState(),search参数指的是里面的参数，setSearch指的是操作参数的方法。
  const [search,setSearch] = useSearchParams()
  // 读取参数值用search.get('参数名')
  {search.get('id')}
  // 更新参数
    function updateSearch(){
     setSearch({id:'005',title:'消息5',content:'qcq'})
  }