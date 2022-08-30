import React, { Component } from 'react'
export default class Detail extends Component {
  render() {
    const dataArr = [
      { id: '01', content: '你好001' },
      { id: '02', content: '你好002' },
      { id: '03', content: '你好003' },
    ]
    //接收state参数
    const {id, title} = this.props.location.state || {}
    //对传过来的id进行比较,返回的是成功的那组对象
    const detailFind = dataArr.find((detailObj) => {
      return detailObj.id === id
    }) || {}
    console.log(this.props)
    return (
      <div>
        <ul>
          <li>ID:{id}</li>
          <li>TITLE:{title}</li>
          <li>CONTENT:{detailFind.content}</li>
        </ul>
      </div>
    )
  }
}
