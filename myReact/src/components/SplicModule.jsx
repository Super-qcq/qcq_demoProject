import React, { Component } from 'react';
import { Icon } from 'antd'
class SplicModule extends Component {
  state={
    arr:[]
  }
  arr2 = [1,2,3,4]
  componentDidMount(){
    this.setState({arr:this.arr2})
  }
  render() {
    const {arr} = this.state
    return (
      arr.map((ele,index)=>{
        return (<>
            <span><Icon type="right"/>{ele}</span>
          </>)
        })
      
    );
  }
}

export default SplicModule;