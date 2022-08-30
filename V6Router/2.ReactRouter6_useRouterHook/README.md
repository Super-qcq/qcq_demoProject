2.ReactRouter6_useRouterHook
useRoutes 函数组件的路由表，当我们生成路由表之后，在注册路由的时候就不再 书写重复的代码  直接用路由表即可


也可以在另外的页面封装：
高亮封装MyNavLink：（activeStyle是自己指定的高亮类名）
在MyNavLink组件中 引入NavLink，用this.props接收即可：
<NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} {...this.props} />

展示导航的使用方式：<MyNavLink to="news">News</MyNavLink>




路由表代码：
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

App中：
  // 根据路由表生成对应的路由规则
  const element = useRoutes(routers)
  // 在注册路由的地方 调用element即可
  {element}




Navigate：只要Navigate被渲染就会引起视图的切换 修改路径，Navigate里面还可以指定跳转的形式
<Navigate to="/home" replace={true}>  如果不写默认是push模式：会留下痕迹，会回退。replace不会回退到上一层。Navigate被用来解决路由重定向问题，进入页面之后默认选中一个路由路径。


NavLink的高亮方式：
参数是一个对象{isActive:true},当点击他所对应的导航时，参数isActive为true,如果点击的是另外一个导航时 isActive为false，所以下面解构取出isActive。当这个导航亮时isActive为true，那类名除了list-group-item之外，再加上 我们设置的activeStyle类，否则加空。
<NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")}/>


也可以在本页面将NavLink的类名封装起来，直接调用即可：
function MyNavLink({ isActive }){
  return "list-group-item" + (isActive ? " activeStyle" : "")
}
<NavLink className={MyNavLink} to="/about">About</NavLink>