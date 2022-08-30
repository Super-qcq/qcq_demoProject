
13.push and replace-src
1.默认路由跳转都是push模式（路径压栈模式） push能够留下痕迹  默认开启push模式，
想开启replace模式的话（替换掉路径栈顶） 直接在路由链接的地方<Link>加一个replace就可以  浏览页面不留痕迹 


2.编程式路由导航：
 history是路由组件上的api

点击按钮后实现replace或push跳转用this.props.history.replace+三种传参方式或者this.props.history.push+三种传参方式：

this.props.history.replace(`/home/message/detail/${id}/${title}`) 携带params参数（在单击事件 的函数中 传值，函数中的这一句相当于导航链接）
点击事件onClick函数中传id和title用柯里化  

当选择的传参方式为state时 push(path,state)和 replace(path,state)方法中可以携带state参数 如下方法中写：
this.props.history.replace(`/home/message/detail`,{ id, title}) 
匹配注册路由和声明接收的方式与三种方式传参一样




前进和后退以及跳转：
方法中写this.props.history.goForward()和
this.props.history.goBack()和
this.props.history.go()


新的需求当页面一打开等两秒自动跳转到指定组件：当组件一挂载时开启定时器 在里面this.props.history.push(`/home/message/detail`) 

  





V6版本中则提供了useNavigate来实现前进、后退等操作。下面就来看下Message的代码吧。

import React, { Component } from 'react'
import { Link, Outlet, useNavigate } from 'react-router-dom'

function anonyCom(MessCom) {
  return (props) => {
    let navigate = useNavigate();
    return <MessCom {...props} navigate={navigate} />
  }
}

class Message extends Component {

  state = {
    messageArr: [
      { id: '01', title: 'message1' },
      { id: '02', title: 'message2' },
      { id: '03', title: 'message3' }
    ]
  }

  pushShow = (messageObj) => {
    this.props.navigate(
      '/home/message/detail',
      {
        state: {
          id: messageObj.id, title: messageObj.title
        }
    })
  }

  replaceShow = (messageObj) => {
    this.props.navigate('/home/message/detail',
    {
      replace: true,
      state: {
        id: messageObj.id, title: messageObj.title
      }
    })
  }

  goBack = () => {
    this.props.navigate(-1);
  }

  goOne = () => {
    this.props.navigate(1);
  }

  goTwo = () => {
    this.props.navigate(2);
  }

  render() {
    return (
      <div>
        <ul>
        {
          this.state.messageArr.map((messageObj) => {
            return (
              <li key={messageObj.id}>
                <Link
                  replace to='/home/message/detail'
                  state={{ id: messageObj.id, title: messageObj.title }}
               >
                 {messageObj.title}
               </Link>
               <button onClick={() => { this.pushShow(messageObj) }}>push查看</button>
               <button onClick={() => { this.replaceShow(messageObj) }}>replace查看</button>
             </li>
            )
          })
        }
        </ul>
        <hr />
        <Outlet />
        <hr />
        <button onClick={this.goBack}>回退</button>
        <button onClick={this.goOne}>前进</button>
        <button onClick={this.goTwo}>go 2</button>
      </div>
    )
  }
}

export default anonyCom(Message);
从上面代码中可以看出useNavigate不仅可以传递路由地址，还可以传递数字，传递正数则向前进，传递负数则向后退。并且还可以传递一个对象，对象中包含了replace与state。非常的强大。

到这里我们可以看到在新版本中，大部分功能都改为了Hook的方式使用。所以如果需要使用新版本则一定要学会Hook相关知识。