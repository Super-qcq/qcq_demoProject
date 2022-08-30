import React, { PureComponent } from 'react';
import B from './B'
import './context.css'
export default class A extends PureComponent{
  state = {
    hasError:''//用于标识了组件是否产生错误 
  }
  //当A的子组件出现报错时候，会触发getDerivedStateFromError调用，并携带错误信息 
  static getDerivedStateFromError(error){ 
    console.log('@0@',error); 
    return {hasError:error} 
  } 
  componentDidCatch(){ 
    console.log('统计错误此处，反回给服务器，用于通知编码人员进行bug的解决')
  }
    render(){ 
      return (
        <div>
         <h2>我是A组件</h2>
        {this.state.hasError?<h2>当前网络不稳定，稍后再试</h2>:<B/>} 
      </div>
      )
    }
}