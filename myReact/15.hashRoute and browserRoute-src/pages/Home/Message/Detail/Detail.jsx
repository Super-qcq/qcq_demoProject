import React, { Component } from 'react'
export default class Detail extends Component {
  render() {
    const dataArr = { id: '01', content: '你好001' }
     return (
      <div>
        <ul>
          <li>ID:{dataArr.id}</li>
          <li>TITLE</li>
          <li>CONTENT:{dataArr.content}</li>
        </ul>
      </div>
    )
  }
}
