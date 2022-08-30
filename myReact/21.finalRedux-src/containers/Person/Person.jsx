import React, { Component } from 'react';
import {connect} from 'react-redux'
import {nanoid} from 'nanoid'
import {addPersons} from '../../redux/actions/Person'
class Person extends Component {
  addPerson = ()=>{
    const name = this.nameNode.value
    const age = this.ageNode.value
    //生成person对象
    const personObj = {id:nanoid(),name,age}
    //将输入的数据 传给容器组件
    this.props.addPerson(personObj)
    //输入完成后清空输入框
    this.nameNode.value = ''
    this.ageNode.value = ''
  }
  render() {
    return (
      <div>
        <h1>我是Person组件,上方组件求和为：{this.props.count}</h1>
        <input type="text" placeholder='输入名字' ref={v =>this.nameNode = v}/>&nbsp;
        <input type="text" placeholder='输入年龄' ref={v =>this.ageNode = v}/>&nbsp;
        <button onClick={this.addPerson}>添加</button>
        <ul>
          {this.props.persons.map((p)=>{
            return <li>名字{p.name}--年龄{p.age}</li>
          })}
        </ul>
      </div>
    );
  }
}
//person组件的容器组件
export default connect(
  state=>({persons:state.persons,count:state.count}),
  {
    addPerson:addPersons
  }
)(Person)