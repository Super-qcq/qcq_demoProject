import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
export default class MyNavLink extends Component {
  render() {
    return (
      <div>
        {/* <NavLink {...this.props}/> */}
        {/* 封装点击高亮效果 */}
         <NavLink className={({ isActive }) => "list-group-item" + (isActive ? " activeStyle" : "")} {...this.props} />
      </div>
    )
  }
}
