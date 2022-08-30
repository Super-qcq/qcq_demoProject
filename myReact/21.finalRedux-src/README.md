当有很多的组件都用redux来共享数据时，会产生很多的action和reducer 我们需要将他们统一到一个文件夹中 统一到actions和reducers中
 添加一个Person组件 1.写组件获取数据的方式 并将组件导入app中   2.准备constant 公共数据   3.准备action    4.准备reducer    5.在Person组件中将数据封装成对象

 store中，redux在为多个组件服务的时候 它的总状态要保存为对象，所以借助redux上的combineReducers({})传入的对象就是redux中传入的总状态对象
 在store中汇总所有的reducer变为一个总的reducer,最终想要的数据都去找自己的容器组件那就可。
 

 浏览器安装redux开发者工具插件  ，在vscode中下载redux-devtools-extension库  并引入store  最终将composeWithDevTools作为createStore的第二个参数
 export default createStore(allReducer,composeWithDevTools())


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

 单独建一个文件：汇总reducer 将所有reducer汇总为一个总的reducer
 在store中引入汇总之后的reducer



将redux语法打包为最纯粹的js代码
 打包运行redux项目 cnpm run build   会生成build文件夹

 
需要用服务器运行build借助serve库会产生内置服务器
serve这个库可以让指定文件夹快速开启一个服务器，把某一个文件夹作为开启服务器的根目录
cnpm install serve -g
将build作为服务器的根目录
serve build


