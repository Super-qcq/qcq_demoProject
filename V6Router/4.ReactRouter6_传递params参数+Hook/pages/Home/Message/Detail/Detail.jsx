import React from 'react'
import {useParams} from 'react-router-dom'
// 用useParams()接收Message组件传递的数据
export default function Detail() {
  return (
    <div>
      <li>id:{useParams().id}</li>
      <li>标题:{useParams().title}</li>
      <li>内容:{useParams().content}</li>
    </div>
  )
}
