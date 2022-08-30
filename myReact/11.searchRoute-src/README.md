
向路由组件传递search参数:
安装qs插件cnpm install qs   在页面引入 import qs from 'qs'
   key = value && key = value 这种编码方式为urlencoded编码方式
   它的作用就是在对象形式的写法和 urlencoded写法之间能够互相转化，如下：
   let obj = {name:'qcq',age:24}
   console.log(qs.stringify(obj))将转换为urlencoded的形式
   将urlencoded编码形式写为对象形式为 qs.parse(urlencodedObj)

   1. 向路由组件传递search参数  /?id=xxx&title=xxx
    <Link to={`/home/message/detail/?id=${items.id}&title=${item`}>{items.title}</Link>
   2. search参数无需声明接收，因为有?这个参数存在 所以正常注册路由即可
    <Route path="/detail" element={<Detail />}></Route>
    v5: <Route path="/home/message/detail" component={Detail}/>
  3. 如何接收search参数
           const {search} = this.props.location
           const { id, title } = qs.parse(search.slice(1))





v6:

与传递params参数相同，还是需要使用高阶函数组件进行封装。这里V6版本中提供了useSearchParams 钩子。代码如下：

import React, { Component } from 'react';
import { useSearchParams } from 'react-router-dom';

// v6使用class组件。需要封装一下。利用hoc组件来获取参数，然后传递给class组件
function myWithRouter(Detail) {
  return (props) => {
    // let [searchParams, setSearchParams] = useSearchParams();
    let [searchParams] = useSearchParams();
    const params = {
      id: searchParams.get('id'),
      title: searchParams.get('titile')
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
    })
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
可以看到上面代码中被注释掉的代码let [searchParams, setSearchParams] = useSearchParams();可见useSearchParams不仅提供了获取searchParams参数，还提供了设置searchParams参数。可以通过setSearchParams进行设置。这里就不为大家过多演示。请大家自己尝试吧。