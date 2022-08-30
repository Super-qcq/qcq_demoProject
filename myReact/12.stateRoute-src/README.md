
向路由组件传递state参数:

   参数不会在地址栏体现比较安全，由于我们使用的是browserRoute 它一直在操作history，所以会一直帮我们记住所传递的参数  所以点击刷新之后数据依然存在
    location.state默认开始是undefined
   但是我们在清理缓存的时候 它从state上读的参数是undefined 所以会报错，我们要进行空值判断，如果清理缓存后state真的没有值那么不会报错
   刷新也能保留参数，其他两个传递参数的方式 在路径中显示参数 刷新不会丢失参数

  1. 向路由组件传递state参数
    <Link to={{path: '/home/message/detail',state:{id:items.id,title:items.title}}}>{items.title}</Link>
  2. state参数无需声明接收， 所以正常注册路由即可
      <Route path="/detail" element={<Detail />}></Route>
    v5: <Route path="/home/message/detail" component={Detail}/>
  3.接收state参数：
    const {id, title} = this.props.location.state || {}
  push能够留下痕迹  默认开启push模式，想开启replace模式的话 直接在导航显示的地方<Link>加一个replace就可以  浏览页面不留痕迹 




    history是路由组件上的api，如何让一般组件用上路由组件的api

v6版本:

Detail组件同样还是高阶函数进行包裹。使用useLocation钩子进行获取state参数

import React, { Component } from 'react';
import { useLocation } from 'react-router-dom';

// v6使用class组件。需要封装一下。利用hoc组件来获取参数，然后传递给class组件
function myWithRouter(Detail) {
  return (props) => {
    let location = useLocation();
    /*
      这里写成 location.state || {}
      因为state在刷新后可能为空，所以这里为空时设置为空对象
    */
    const stateObj = location.state || {};
    const params = {
      id: stateObj.id,
      title: stateObj.title
    }
    return <Detail {...props} params={params} />
  }
}

const DetailData = [
  { id: '01', content: '11111111111111111111' },
  { id: '02', content: '22222222222222222222' },
  { id: '03', content: '33333333333333333333' }
]

class Detail extends Component {
  render() {
    const contentStr = DetailData.find((detailObj) => {
      return detailObj.id === this.props.params.id;
    }) || {}; // 这里 || {} 当未找到匹配的值时contentStr设置为空对象
   return (
    <ul>
      <li>ID:{this.props.params.id}</li>
      <li>TITLE:{this.props.params.title}</li>
      <li>CONTENT:{contentStr.content}</li>
     </ul>
     )
  }
}

export default myWithRouter(Detail);