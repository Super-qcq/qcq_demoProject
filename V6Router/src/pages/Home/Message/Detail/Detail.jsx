import React from 'react'
import {useLocation, useNavigationType} from 'react-router-dom'
// 用useLocation().state接收Message组件传递的数据
export default function Detail() {
  //useLocation()上面可以拿到search和state参数，这个取决于当时的参数是采用哪种方式传递的
  // useNavigationType() 返回当前的导航类型（用户是如何来到当前页面的）

  console.log('当前组件是如何跳转的'+useNavigationType())
  
  return (
    <div>
      <ul>
        <li>id:{useLocation().state.id}</li>
        <li>标题:{useLocation().state.title}</li>
        <li>内容:{useLocation().state.content}</li>
      </ul>
    </div>
  )
}
