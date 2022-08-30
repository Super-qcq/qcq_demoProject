import React, { Component } from 'react'
import axios from 'axios'
export default class Search extends Component {
  search=()=>{
  //1.获取用户的输入
    // const {keyWordElement:{value}} = this//双层解构赋值
    // const {keyWordElement:{value:keyWord}} = this//双层解构赋值 并更改名字
    //发送请求前通知App更新状态 当点击搜索后不是第一次请求取消欢迎词，数据还没回来之前 显示加载中
    this.props.updateState({isFrist:false,isLoading:true})
  
  //2.发送网络请求
    axios.get(`/api1/search/users2?q=${this.props.q}`).then(response => 
    //发送请求后通知App更改状态 接收App传的函数 并把搜索的数据传回去 不显示加载数据
     this.props.updateState({isLoading:false,users:response.data.items})
    //  存错误对象的属性
    ,error=>{ this.props.updateState({isLoading:false,err:error.message})})
  }
  // 用柯里化将用户输入保存起来
  saveInput=(typeData)=>{
    return (event)=>{
      this.props.updateState({[typeData]:event.target.value})
    }
  }
  render() {
    return (
      <section className="jumbotron">
      <h3 className="jumbotron-heading">搜索Github用户</h3>
      <div>
      <input onChange={this.saveInput('q')} type="text" placeholder="输入关键词点击搜索"/>&nbsp;
        {/* <input ref={v=>this.keyWordElement=v} onChange={this.saveInput('q')} type="text" placeholder="输入关键词点击搜索"/>&nbsp; */}
        {/* <input ref={v=>this.keyWordElement=v} type="text" placeholder="输入关键词点击搜索"/>&nbsp; */}
        <button onClick={this.search}>搜索</button>
      </div>
    </section>
    )
  }
}
