import React, { Component } from 'react'
import './List.css'
export default class List extends Component {
  // List中要展示：1.用户信息  2.第一次请求欢迎词  3.loading加载中   4.请求失败信息
  render() {
    const {users,isFrist,isLoading,err} = this.props
    return (
      <div className="row" >
        {
          isFrist ? <h1>欢迎您</h1> :
          isLoading ? <h1>...Loading</h1> :
          err ? <h1>{err}</h1> :
          //拿到App中传来的数据
          users.map((userObj) => {//this.props.users中有几个人的信息遍历几次,有返回值
          return (
            <div key={userObj.id} className="card">
              <a rel="noreferrer" href={userObj.html_url} target="_blank">
                <img alt="head_portrait" src={userObj.avatar_url} style={{ width: '100px' }} />
              </a>
              <p className="card-text">{userObj.login}</p>
            </div>
          )
        })}
      </div>
    )
  }
}
