//该模块是处理Person的reducer
import {ADD_PERSON} from '../constant'
//设置初始值
const initstate = [{id:'001',name:'tom',age:18}]
export default function personReducer (prestate = initstate,action){
  const {type,data} = action
  if(type === ADD_PERSON){
    //将添加的有关人的对象 添加到之前的人 的前面
    // return prestate.unshift(data) 此处不可以这样用，这样会导致prestate被改写，personReducer就不是纯函数了。就会影响redux识别状态的改变
    return [data,...prestate]
  }else{
    return prestate
  }
}