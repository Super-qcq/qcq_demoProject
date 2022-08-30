 /**
  * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
  */
 //引入createStore专门创建redux中最为核心的store
 import { legacy_createStore as createStore} from 'redux'
 //引入为Count组件服务的reducer
 import countReducer from './count_reducer'
 //暴露store
 export default createStore(countReducer)