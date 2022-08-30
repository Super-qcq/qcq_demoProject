// 创建外壳组件App  在这里组装
import React,{Component} from 'react'
import Hello from './components/Hello/Hello'//只写一个默认找index
import Welcome from './components/Welcome/Welcome'//只写一个默认找index

export default class App extends Component{
  render(){
    return (
      <div>
        <Hello/>
        <Welcome/>
      </div>
    )
  }
}