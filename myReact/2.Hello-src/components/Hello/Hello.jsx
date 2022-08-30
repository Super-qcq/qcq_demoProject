import React from 'react'
import './Hello.css'
export default class Hello extends React.Component{
  state = {weather:true}
  changeWeather=()=>{
    const {weather} = this.state
    this.setState({weather:!weather})
  }
  render(){
    return <div className='demo' onClick={this.changeWeather}>Hello react{this.state.weather?'热':'凉爽'}</div>
  }
}
