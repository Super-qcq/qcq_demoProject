import React from 'react'
import {Link,Outlet} from 'react-router-dom'
export default function Message() {
  const[message] = React.useState([
    {id:'001',title:'消息1',content:'锄禾日当午'},
    {id:'002',title:'消息2',content:'汗滴禾下土'},
    {id:'003',title:'消息3',content:'谁知盘中餐'},
    {id:'004',title:'消息4',content:'粒粒皆辛苦'},
  ])
  return (
    <div>
      <ul>
        {message.map((items)=>{
          return(
            <li key={items.id}>
              <Link to={`detail?id=${items.id}&title=${items.title}&content=${items.content}`}>{items.title}</Link>&nbsp;&nbsp;
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

