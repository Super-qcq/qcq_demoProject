import React from 'react'
import ReactDom from 'react-dom'
export default function Count (){
  const [count, setCount] = React.useState(0)
  const myRef = React.useRef()
  function add(){
    setCount(count=>count+1)
  }
  //卸载组件
  function unmount(){
    ReactDom.unmountComponentAtNode(document.getElementById('root'))
  }
  //提示输入的数据
  function showRef(){
    alert(myRef.current.value)
  }
  //需求：当页面一加载时，和就自动+1
  React.useEffect(()=>{
    //在此可以执行任何副作用的操作
    const timer = setInterval(()=>{
      setCount(count=>count+1)
    },1000)
    return ()=>{
      //componentwi11Unmount  清除定时器
      clearInterval(timer)
    }
  },[])
  return (
    <div>
      <h1>当前的和为{count}</h1>
      <input type="text" ref={myRef}/>
      <button onClick={showRef}>点我提示输入的数据</button>&nbsp;
      <button onClick={add}>点我+1</button>&nbsp;
      <button onClick={unmount}>卸载组件</button>
      
    </div>
  )
}