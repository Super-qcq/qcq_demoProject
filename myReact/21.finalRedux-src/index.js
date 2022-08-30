import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import store from './redux/store'
// 此处需要用 Provider包裹APP，目的是让APP所有的后代容器组件都能接收到store
ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'))
