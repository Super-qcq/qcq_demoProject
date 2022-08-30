import React from 'react'

export default function Count (){
  //参数说明：第1个为当前状态值，第2个为更新状态值的函数
  const [count, setCount] = React.useState(0)
  const [name, setName] = React.useState('tom')
  function add(){
    // 写法一：参数为非函数值，直接指定新的状态值，内部用其覆盖原来的状态值
    // setCount(count + 1)
    // 写法二：参数为函数，接收原本的状态值，返回新的状态值，内部用其覆盖原来的状态值
    setCount(count=>count+1)
  }
  function changeName(){
    // setName('jack')
    setName (name => name ='Jack')
  }
  return (
    <div>
      <h1>当前的和为{count}，当前名字为：{name}</h1>
      <button onClick={add}>点我+1</button>&nbsp;
      <button onClick={changeName}>点我改名</button>
    </div>
  )
}