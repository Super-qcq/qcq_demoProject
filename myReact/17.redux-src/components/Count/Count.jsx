import React, { Component } from 'react';
//引入store用于获取redux中的状态
import store from '../../redux/store'
class Count extends Component {
  //共享数据在store中 所以在这里不写state
  // componentDidMount(){
  //   //检测redux中状态的变化，只要变化调用render
  //    store.subscribe(
  //     ()=>{
  //       this.setState({}) //调用它会该状态会调用render，然而并不改变自身的state所以不传值  只为调用render
  //     }
  //   )
  // }
  add = () =>{
    const {value} = this.selectValue
    store.dispatch({type:'add',data:+value})
  }
  unadd = () =>{
    const {value} = this.selectValue
    store.dispatch({type:'unadd',data:+value})
  }
  oddadd = () =>{
    const {value} = this.selectValue
   if(store.getState() % 2 !==0){
    store.dispatch({type:'add',data:+value})
   }
  }
  asyncadd = () =>{
    const {value} = this.selectValue
    setTimeout(()=>{
      store.dispatch({type:'add',data:+value})
    },1000)
  }
  render() {
    return (
      <div>
        {/*api:store.getState()得到store中的状态 */}
        <h1>当前和为：{store.getState()}</h1>
        <select ref={v => this.selectValue = v}>
          <option value = '1'>1</option>
          <option value = '2'>2</option>
          <option value = '3'>3</option>
        </select>&nbsp;
        <button onClick={this.add}>+</button>&nbsp;
        <button onClick={this.unadd}>-</button>&nbsp;
        <button onClick={this.oddadd}>奇数加</button>&nbsp;
        <button onClick={this.asyncadd}>异步加</button>
      </div>
    );
  }
}

export default Count;