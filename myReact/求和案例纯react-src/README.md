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
3.安装redux cnpm install redux
4.store.js中
该文件专门用于暴露一个store对象，整个应用只有一个store对象
  //引入createStore专门创建redux中最为核心的store
  import {createStore} from 'redux'
  //引入为Count组件服务的reducer
  import countReducer from './count_reducer'
  //暴露store
  export default createStore(countReducer)

  5.count_reducer.js中（该文件是用于创建一个为Count组件服务的reducer,reducer的本质就是一个函数  接到旧值  返回处理后的新值）,reducer函数会接到两个参数，分别为：之前的状态（preState）,动作对象（action）
  function countReducer(preState,action){

  }
  初始化时action中的type:@@init,data:没有
  preState:undefined 我们要将初始值改掉preState = 0 再返回
  6.在Count组件中 将自己独有的数据存在自己的state中，展示初始化数据时 找store要数据
  //引入store,用于获取redux中保存的状态
  api1:store.getState() 开始时store帮我们调用count_reducer中的countReducer拿到初始值传回组件


调用setState后做两件事，更改状态和 调用render
Redux不会自动更改状态，需要人为更改状态
