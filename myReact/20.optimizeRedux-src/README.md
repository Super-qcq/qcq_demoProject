1.优化：代码层面：容器组件中的一般函数合并为箭头函数，并且直接写在connect中
     api层面：react-redux可以帮我们自动分发自动dispatch 
              mapDispatchToProps可以传两种值 一个是函数返回key value的对象。
              一个是对象 只要给它一个action那么它可以自动分发（react-redux底层做了判断：如果返回的是一个对象那么 会自动给store分发）
//优化：将状态和操作对象的方法这两个函数都放入connect中，操作对象的方法可以直接返回对象，自动进行dispatch
export default connect(
  state =>({count:state}),
  {
    add:addAction,
    unadd:unaddAction
  }
)(CountUI)



2.优化：容器组件已经默认拥有检测状态改变的能力connect()(),不用在index中进行如下手动监测
store.subscribe(()=>{
  ReactDOM.render(<App/>,document.getElementById('root'))
})

3.优化：Provider可以帮助我们将store一次性传给所有需要store的容器组件,不用在App中专门给某一个容器组件传递
在index中:
import {Provider} from 'react-redux'
import store from './redux/store'
ReactDOM.render(<Provider store={store}><App/></Provider>,document.getElementById('root'))

4.优化：可以将文件进行整合，将UI组件和容器组件进行整合，没有必要分开来写