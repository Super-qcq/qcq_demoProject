
路由：
     spa理解：整个应用只有一个完整页面，点击页面中的链接不会刷新页面，只会做页面的局部更新，数据都需要用ajax请求获取，并在前端异步展现
                     单页面多组件
    路由原理：靠的就是BOM的history
    每一个地址对应一个组件   当我们点击页面的链接时  地址栏path会发生改变 但是页面不跳转  通过查看地址栏path 找到对应地址的组件加载到页面
     一个路由就是一个映射关系key就是path   value就是组件conpenment或者函数
     history有两种工作模式 1.直接使用h5推出的BrowserRouter,主要是history API 
                          2.hash值（锚点）url中有#号使用的是URL的哈希值，兼容性更好
   react-xxx都是react插件库
  
  基本使用：
  1.明确好界面中的导航区、展示区  
  2.展示导航区的a标签改为Link标签   
  3.展示区写Route标签进行路径匹配    
  4.App的最外侧包裹了一个<BrowserRouter></BrowserRouter>
   将所有的组件都交给一个路由器去管理  所以要在index入口页面引入路由import{BrowserRouter} from 'react-router-dom'
   <BrowserRouter><App/></BrowserRouter>,document.getElementById('root')  
   在点击切换页面 实现切换路由  和注册路由

   在App组装页面将 路由组件和注册路由组件部分写成以下形式:
   import {Link,Route,Routes} from 'react-router-dom'
   切换路由 <Link className="list-group-item" to="/about">About</Link>
          <Link className="list-group-item" to="/home">Home</Link>
          其实Link标签最终被解析为a标签
   注册路由:(V6版本)
               <Routes>
                 <Route path="/about"element={<About/>}> </Route>
                 <Route path="/home"element={<Home/>}> </Route>
               </Routes>
            （V5版本）
                  <Route path="/about" component={About}/>
									<Route path="/home" component={Home}/>

   哈希router地址会出现一个#  #后面的参数不会发给服务器

路由组件放在pages文件夹中  路由组件是路由器帮我们渲染的  路由组件会收到 路由器给传递的三个重要信息：history location  match
  一般组件与路由组件的异同：
  1.写法不同   2.放置位置不同pages  3.接收到的props不同

  路由组件的props上有
  history:go(),goBack(),goForward(),push(),replace()
  location:pathname:'/about',search:'',state:undefined
  match:params:(),path:'/about',url:'/about'