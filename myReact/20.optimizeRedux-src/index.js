import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import store from './redux/store'
// 目的是将store传给需要store的容器组件
ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'))
