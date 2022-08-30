import React from 'react'
import ReactDom from 'react-dom'
export default function Count (){
  const [count, setCount] = React.useState(0)
  function add(){
    setCount(count=>count+1)
  }
  //卸载组件
  function unmount(){
    ReactDom.unmountComponentAtNode(document.getElementById('root'))
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
   // 如果不写第二个参数，则所有的可变参数都会受到监视。
    //   如果[]中没有值，空数组。谁也不检测，相当于一挂载就显示 显示1次 componentDidMount
    //   如果[]有一个参数，则只会监视一个，一挂载就显示，参数改变也显示。显示n+1次 componentDidupdate
    //   函数中所返回的那个函数就是componentwi11Unmount
  },[])
  return (
    <div>
      <h1>当前的和为{count}</h1>
      <button onClick={add}>点我+1</button>
      <button onClick={unmount}>卸载组件</button>
    </div>
  )
}