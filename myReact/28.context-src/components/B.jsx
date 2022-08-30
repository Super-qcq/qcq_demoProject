import React, { Component } from 'react'
import C from './C'
import './context.css'
export default class B extends Component {
  render() {
    return (
      <div className="child">
        <h1>我是B组件，A组件的用户名是???</h1>
        <C/>
      </div>
    );
  }
}
