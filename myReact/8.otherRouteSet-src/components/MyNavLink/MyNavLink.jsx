import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
export default class MyNavLink extends Component {
  // 封装NavLink成MyNavLink在MyNavLink中所传的东西 在这里都可以接收到，包括
  render() {
    return (
      <div>
        <NavLink activeClassName="activeStyle" className="list-group-item" {...this.props}/>
      </div>
    )
  }
}
