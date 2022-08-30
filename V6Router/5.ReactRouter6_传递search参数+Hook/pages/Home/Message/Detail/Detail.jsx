import React from 'react'
import {useSearchParams} from 'react-router-dom'
// 用useSearchParams()接收Message组件传递的数据
export default function Detail() {
  //useSearchParams()的用法形似于useState(),search参数指的是里面的参数，setSearch指的是操作参数的方法。
  // 读取参数值用search.get('参数名')
  const [search,setSearch] = useSearchParams()
  function updateSearch(){
    setSearch({id:'005',title:'消息5',content:'qcq'})
  }
  return (
    <div>
      <ul>
        <li>id:{search.get('id')}</li>
        <li>标题:{search.get('title')}</li>
        <li>内容:{search.get('content')}</li>
      </ul>
      <button onClick={updateSearch}>点我更新search</button>
    </div>
  )
}
