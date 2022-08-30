import React from 'react'
import {Link, Outlet, useNavigate, useInRouterContext, useOutlet, useResolvedPath} from 'react-router-dom'
export default function Message() {
  const[message] = React.useState([
    {id:'001',title:'消息1',content:'锄禾日当午'},
    {id:'002',title:'消息2',content:'汗滴禾下土'},
    {id:'003',title:'消息3',content:'谁知盘中餐'},
    {id:'004',title:'消息4',content:'粒粒皆辛苦'},
  ])

// useNavigationType() 返回当前的导航类型（用户是如何来到当前页面的）返回值：pop刷新页面来到的(在浏览器中直接打开了这个页面来到的)   还有push    以及replace

  const navigate = useNavigate()
  function showDetail(items){
    navigate('detail',
    {
     replace:false,
     state:{
      id:items.id,
      title:items.title,
      content:items.content
     }
    })
  }
  // useInRouterContext()  如果组件被BrowserRouter包裹 那这个组件就是处于路由的上下文组件。如果处于上下文 就会返回true否则脱离路由器测管理则返回false。
  console.log('当前处于路由的上下文组件中'+useInRouterContext())
  // useOutlet()  作用：用来呈现当前组件中的嵌套路由组件。  当嵌套的组件没有挂载时会输出null，当挂载了之后，会输出 嵌套组件的  组件对象相关信息。
  console.log('用来呈现当前组件中的嵌套路由组件'+useOutlet())
  // useResolvedPath()用来解析路径的   当点击了对应的组件 会输出里面的参数路径
  console.log('用来解析路径的'+useResolvedPath('de'))

  return (
    <div>
      <ul>
        {message.map((items)=>{
          return(
           <li key={items.id}>
              <Link to="detail" state={{id:items.id,title:items.title,content:items.content}}>{items.title}</Link>&nbsp;&nbsp;
              <button onClick={()=>showDetail(items)}>查看详情</button>
            </li>
          )
        })}
      </ul>
      <hr />
      {/* detail组件，路由组件的展示位置 */}
      <Outlet/>
    </div>
  )
}

