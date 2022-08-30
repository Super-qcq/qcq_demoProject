import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './redux/store'
ReactDOM.render(<App/>,document.getElementById('root'))

// store.subscribe()  这个api 用来检测redux是否有变化，当检测到有变化时，我们需要人为的调用render,最终重新渲染页面，达到效果。
store.subscribe(()=>{
  ReactDOM.render(<App/>,document.getElementById('root'))
})
