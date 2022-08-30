 /**
  * 该文件专门用于暴露一个store对象，整个应用只有一个store对象
  */
 //引入createStore专门创建redux中最为核心的store
 import { legacy_createStore as createStore, combineReducers} from 'redux'
 //引入为Count组件服务的reducer
 import countReducer from './reducers/count'
 //引入为Person组件服务的reducer
 import personReducer from './reducers/Person'
 //引入 redux-devtools-extension
 import {composeWithDevTools} from 'redux-devtools-extension'
 //汇总所有的reducer变为一个总的reducer
 const allReducer = combineReducers({
   count:countReducer,
   persons:personReducer
 })
 //暴露store
 export default createStore(allReducer,composeWithDevTools())