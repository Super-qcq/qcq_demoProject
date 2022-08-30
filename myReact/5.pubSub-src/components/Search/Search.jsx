import React, { Component } from 'react'
import axios from 'axios'
import PubSub from 'pubsub-js'
export default class Search extends Component {
  
  search=()=>{
    // 解构赋值用户输入关键词
    const {keyWordElement:{value:keywords}} = this
     //发送请求前通知List更新状态 当点击搜索后不是第一次请求取消欢迎词，数据还没回来之前 显示加载中
    PubSub.publish('state',{isFrist:false,isLoading:true})
  //2.发送网络请求
    axios.get(`/api1/search/users?q=${keywords}`).then(response => 
    //发送请求后通知List更改状态不显示加载数据
    PubSub.publish('state',{isLoading:false,users:response.data.items})
    //  存错误对象的属性
    ,error=>{ PubSub.publish('state',{isLoading:false,err:error.message})})
  }
  render() {
    return (
      <section className="jumbotron">
      <h3 className="jumbotron-heading">搜索Github用户</h3>
      <div>
        <input ref={v=>this.keyWordElement=v} type="text" placeholder="输入关键词点击搜索"/>&nbsp;
        <button onClick={this.search}>搜索</button>
      </div>
    </section>
    )
  }
}
