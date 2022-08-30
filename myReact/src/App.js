import React, { Component } from 'react'
// import { Button } from 'antd'
import '../node_modules/antd/dist/antd.css';
import SplicModule from "./components/SplicModule"
import './App.less';
export default class App extends Component {
  render() {
    return (
      <div>
       {/* <Button type="primary">Primary Button</Button>
       <Button>Default Button</Button> */}
       <SplicModule/>
      </div>
    )
  }
}
