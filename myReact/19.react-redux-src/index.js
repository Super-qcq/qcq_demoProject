import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
ReactDOM.render(<App/>,document.getElementById('root'))
//api:用于监测 当store变化时渲染页面
store.subscribe(()=>{
  ReactDOM.render(<App/>,document.getElementById('root'))
})
