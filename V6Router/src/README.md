useInRouterContext()  如果组件被BrowserRouter包裹 那这个组件就是处于路由的上下文组件。
如果处于上下文 就会返回true否则脱离路由器测管理则返回false。


useNavigationType() 返回当前的导航类型（用户是如何来到当前页面的）
返回值：pop刷新页面来到的(在浏览器中直接打开了这个页面来到的)   push    replace


useOutlet()  作用：用来呈现当前组件中的嵌套路由组件。  当嵌套的组件没有挂载时会输出null，当挂载了之后，会输出  嵌套组件的  组件对象相关信息。




useResolvedPath()用来解析路径的   当点击了对应的组件 会输出里面的参数路径