redux是什么？
redux是一个专门用于做状态管理的js库（不是react插件库）
它可以用在react、angular、vue等项目中，但基本与react配合使用
作用：集中式管理react应用中多个组件共享的状态

什么情况下需要使用redux
某个组件的状态 需要让其他组件可以随时拿到（共享）
一个组件需要改变另一个组件的状态（通信）
总体原则：能不用就不用，如果不用比较吃力才考虑使用

1.创建redux文件夹
2.里面包括store.js和为谁服务的reducer(count_reducer.js)
3.安装redux cnpm install --save redux
4.store.js中
该文件专门用于暴露一个store对象，整个应用只有一个store对象
  //引入createStore专门创建redux中最为核心的store
  import {createStore} from 'redux'
  //引入为Count组件服务的reducer
  import countReducer from './count_reducer'
  //暴露store
  export default createStore(countReducer)


   20220505提示createStore弃用的，改用import { legacy_createStore as createStore} from 'redux' 就没有提示了。

  5.count_reducer.js中（该文件是用于创建一个为Count组件服务的reducer,reducer的本质就是一个函数  接到旧值  返回处理后的新值）,reducer函数会接到两个参数，分别为：之前的状态（preState）,动作对象（action）

  //初始化preState 形参中 如果给定的preState为undefined或者没传 则为初始化等于initState=0,也可以在最后直接返回0
  const initState = 0
  export default function countReducer(preState = initState, action) {


  }
  
  整个页面一进来store就会帮我们做一件事，给reducer给一个action 里面的type为@@init，不给data,再给preState:undefined 作为初始化
  
  初始化时action中的type:@@init,data:没有
  preState:undefined 我们要将初始值改掉preState = 0 再返回

  6.在Count组件中 将自己独有的数据存在自己的state中，展示初始化数据时 找store要数据
  //引入store,用于获取redux中保存的状态
  api1:store.getState() 开始时store帮我们调用count_reducer中的countReducer拿到初始值传回组件 显示初始值
  在button点击事件中取出输入的数据为value 和 给store传数据
  api2:store.dispatch({type:'add',data:value})

但是redux中的状态变化后 页面不会发生变化不会更新，原因是之前调用this.setState后做两件事，react会更改状态和 调用render
Redux它不会自动更新只会维护和管理状态，需要人为更新，原理就是需要检测redux中的状态如果发生改变,那就人为调用render
在componentDidMount(){
  //检测redux中状态的变化，只要变化调用render
  api3: store.subscribe(
    ()=>{
      this.setState({}) //调用它会该状态会调用render，然而并不改变自身的state所以不传值  只为调用render
    }
  )
}

但是当组件多的时候 要在每个组件中不断的写componentDidMount，所以可以在index页面中 一次性进行监测只要redux状态发生变化 就调用 render

import store from './redux/store'
ReactDOM.render(<App/>,document.getElementById('root'))
store.subscribe(()=>{
  ReactDOM.render(<App/>,document.getElementById('root'))
})










总结：
    (1).去除Count组件自身的状态
    (2).src下建立:
    - redux-store.js-count_reducer.js
    (3).store.js:
       1).引入redux中的createStore两数,创建一不store
       2).createStore调用时要传入一个为其服务的reducer
       3).记得暴露store对象
    (4).count_reducer.js:
       1).reducer的本质是一个函数，接收：prestate,action,返回加工后的状态
       2).reducer有两个作用：初始化状态，加工状态
       3).reducer:被第一次调用时，是store自动触发的，
         传递的preState是undefined,传递的action是{type:'@REDUX/INIT_a.2.b.4)
    (5).在index.js中监测store中状态的改变，一旦发生改变重新渲染<App/>
    备注：redux.只负责管理状态，至于状态的改变驱动着页面的展示，要靠我们自己写。
