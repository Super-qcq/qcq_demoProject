
向路由组件传递消息数据：
   向路由组件传递params参数，首先在声明组件的时候要先传递，(id和title)
    <Link to={`/home/message/detail/${items.id}/${items.title}`}>{items.title}</Link>
   其次在注册路由时要接收 
    <Route path="/detail/:id/:title" element={<Detail />}></Route>
    v5: <Route path="/home/message/detail/:id/:title" component={Detail}/>
   最后在要展示的组件中接收this.props.match.params中解构赋值拿到
    //接收params参数
    const { id, title } = this.props.match.params

   find() 方法返回数组中满足提供的测试函数的第一个元素的值。否则返回 undefined。

   在V6版本中，不能V5版本中那样从this.props中获取路由组件的相关参数了。你如果打印一下props就会发现，props中毛都没有。这里V6版本中就提供了一个hook（钩子），来让我们可以直接获取到所传递的params参数，这个钩子就是 useParams。那么我们为毛不直接使用呢？因为React的hook只能在hoc函数高阶组件中使用。看到这里是不是就明白了为什么要包一层了吧。






import React, { Component } from 'react';
import { useParams } from 'react-router-dom';

// v6使用class组件。需要封装一下。利用hoc组件来获取参数，然后传递给class组件
function myWithRouter(Detail) {
  return (props) => {
    return <Detail {...props} params={useParams()} />
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
上面代码中定义了一个myWithRouter函数组件并将Detail组件传入，在myWithRouter中获取useParams以及相关props，直接传递给Detail组件使用。这样我们就可以在Detail组件中成功的获取到params参数了。

当然上面不是最好的写法。我们直接用函数组件不是更好么。都不需要再进行在外面封装一层了。当然这里对于高阶组件不进行过多探讨，小伙伴们请自己去学习吧。高阶组件目前是React官方推荐的编码方式哦。