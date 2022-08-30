import React,{Component} from 'react'
import Search from './components/Search/Search'
import List from './components/List/List'
export default class App extends Component{
  // 初始化状态 1.用户信息  2.第一次请求欢迎词  3.loading加载中   4.请求失败信息
  state={
    q:'',//用柯里化将用户输入保存起来
    users:[],
    isFrist:true,
    isLoading:false,
    err:''
  }
  // 操作状态 将传回的数据用setState操作
  // saveUsers=(users)=>{
  //  this.setState({users})
  // }
  //统一操作状态
   updateState=(stateObj)=>{
    this.setState(stateObj)
   }
  render(){
    return (
      <div className="container">
        {/* 父给子传一个函数 */}
        <Search updateState={this.updateState} q={this.state.q}></Search>
        {/* 这里App将数据传回List，可以随意确定属性 */}
        <List {...this.state}></List>
      </div>
    )
  }
}