一种组件间的通信方式，常用于【祖组件】与【后代组件】之间的通信
一般来说相邻两个父子组件之间 用state和props直接通信，涉及到父组件给孙组件之间的通信可用此方式，可直接绕开子组件。
方法：
1.创建组件上下文文件：
import React from 'react';
//创建context对象
export const myContext = React.createContext()

2.父组件引入myContext
//导入myContext的声明
import {myContext} from './myContext'

将要传递的后代组件用myContext.Provider 标签包裹，将要传递的信息 state解构赋值后，放在myContext.Provider的value中，此后B组件及其后代组件都可以访问的到。

        <myContext.Provider value = {{name,age}}>
          <B/>
        </myContext.Provider>

3.后代组件接收（类组件专用）
//导入myContext的声明
import {myContext} from './myContext' 
// 接收myContext
static contextType = myContext
//显示A组件数据
{this.context.name}

  类组件和函数组件通用方式接收：
  //导入myContext的声明
  import {myContext} from './myContext'
  //用<myContext.Consumer>标签包裹，在里面一个函数中，将数据返回。
  <myContext.Consumer>
                  {
                    value=>{
                      return `我是C组件，A组件的姓名是${value.name}，年龄是${value.age}`
                    }
                  }
  </myContext.Consumer>


