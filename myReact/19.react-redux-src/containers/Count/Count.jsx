//所有的UI组件都应该包裹一个容器组件，他们是父子关系
//容器组件将store和UI组件连接起来  将redux的两个api都集中在这里
// 2.引入UI组件
// 3.引入store 在上一层通过props传给容器Count（app中引入store  后<Count store={store}/>）
// 4.引入connect用于连接UI组件与redux import {connect} from 'react-redux'
// 5.传入UI组件并暴露出去先让容器组件和UI组件产生联系export default connect()(CountUI)
// 6.在App中引入容器Count （对应3）
import CountUI from '../../components/Count/CountUI'
import {connect} from 'react-redux'
import {addAction, unaddAction} from '../../redux/count_action'
//函数返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value---状态 相当于store.getState()
function mapStateToProps(state){
  return {count:state}
}
//函数返回的对象中的key就作为传递给UI组件props的key,value就作为传递给UI组件props的value---操作状态的方法
function mapDispatchToProps(dispatch){
  return {
    //通知redux执行加法,将action分发给redux action中的内容在count_action中
    add:number=>dispatch(addAction(number)),
    unadd:number=>dispatch(unaddAction(number))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CountUI)