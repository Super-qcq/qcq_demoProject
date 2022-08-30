参数不会在地址栏体现比较安全，由于我们使用的是browserRoute 它一直在操作history，所以会一直帮我们记住所传递的参数  所以点击刷新之后数据依然存在
    location.state默认开始是undefined
   但是我们在清理缓存的时候 它从state上读的参数是undefined 所以会报错，我们要进行空值判断，如果清理缓存后state真的没有值那么不会报错
   刷新也能保留参数，其他两个传递参数的方式 在路径中显示参数 刷新不会丢失参数



路由组件之间的传递消息,传递state参数
1.父组件中导航连接，将消息用state={{id:items.id,title:items.title,content:items.content}} 用对象传递：
 <li key={items.id}>
              <Link to="detail" state={{id:items.id,title:items.title,content:items.content}}>{items.title}</Link>&nbsp;&nbsp;
            </li>
2.注册路由时不用接收参数在路由表中   在注册路由的地方用<Outlet/>呈现

3.在子组件中用useSearchParams接收search参数：

 // 用useLocation().state接收Message组件传递的数据
//useLocation()上面可以拿到search和state参数，这个取决于当时的参数是采用哪种方式传递的
  传递state参数时的读取方式：
 <ul>
        <li>id:{useLocation().state.id}</li>
        <li>标题:{useLocation().state.title}</li>
        <li>内容:{useLocation().state.content}</li>
      </ul>