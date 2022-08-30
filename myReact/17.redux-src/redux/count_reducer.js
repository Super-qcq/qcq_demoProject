/**
 * reducers如同后厨的厨师，接收两个参数一个是之前的状态 一个是动作对象，最终返回一个新的状态，所以reducer的本质就是一个函数
 * 该文件用于创建一个为Count组件服务的reducer，reducer的本质是一个函数
 */

//初始化preState 形参中 如果给定的preState为undefined或者没传 则为初始化等于initState=0,也可以在最后直接返回0。  返回0的目的是，在页面初始化时 用store.getState()获取初始值  展示在页面上。 
const initState = 0
export default function countReducer(preState = initState, action) {
  //从action中获取type和data，根据type决定如何加工数据
  const {
    type,
    data
  } = action
  //判断传的type是加就进行加法，是减就进行减法，如果两个都不是 就是初始化，将preState改为0，初始化时action中的type:@@init
  if (type === 'add') {
    return preState + data
  } else if (type === 'unadd') {
    return preState - data
  } else {
    return preState
  }

}