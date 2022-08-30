import * as React from 'react'
import './Welcome.css'
export default class Hello extends React.Component{
  state = {
    size:{
      width:10,
      height:20
    }
  }
  componentDidMount() {
    //将状态里面的对象拿出来 给对象的属性分别赋值  最后再将对象给放回去
    const {size} = this.state
    size.width = 30
    size.height = 40
    this.setState({size},()=>{
      console.log(this.state.size)
    })

  // this.setState({size:{...this.state.size,width:30,height:40}},()=>{
  //   console.log(this.state.size)
  // })
}
  render(){
    return <div className='title'>Hello react</div>
  }
}

