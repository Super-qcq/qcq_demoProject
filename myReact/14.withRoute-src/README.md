 将路由组件上控制子组件 前进回退的按钮放在一般组件中的父组件上时不会有作用，因为一般组件上面没有history和location等，它的props是空对象。
 如何让一般组件用上路由组件上的api：
 在一般组件上导入withRouter:
 import {withRouter} from 'react-router-dom'

 改变导出组件方式:export default withRouter(Header)
 withRouter的作用：能够接受一般组件，然后会在一般组件的身上加上路由组件所特有的三个特殊的api，返回值是一个新组件。
 其他的写法和在路由组件中的写法相同
 
 v6已经没有了withRoute的写法

