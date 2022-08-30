    7.render props如何向组件内部动态传入带内容的结构（标签）？
    Vue中：
    使用s1ot技术，也就是通过组件标签体传入结构<A><B/></A>
    React中：
    使用children props:通过组件标签体传入结构
    使用render props：通过组件标签属性传入结构，而且可以携带数据，一般用render函数属性
    
    children props：
    <A>
     <B>xxxx</B>
    </A>
     {this.props.children}
    问题：如果B组件需要A组件内的数据，==>做不到
    
    
    
    render props: 
    App中：给A组件先传一个函数，函数返回的是B组件,A组件将要传给B组件的数据 先通过函数先给App组件 再传给B组件，B组件就拿到了A组件的数据
    < A render={(data)=>{return <B data={data}></B>}}></A> 
   
    给A组件当中的数据传到B中,这里要的是App中函数的返回值，返回的是B组件 将B组件放在这里
    A组件：{this.props.render(this.state.data)} 
    B组件：读取A组件传入的数据显示{this.props,data}

    类似于插槽技术：在一个组件的指定位置 预留好一个位置，把第三方组件放在这个位置 并传递给它数据。 在A组件的指定位置预留好 放B组件的地方 并把要准备传出的数据传出。那么在App中就直接指定要在A组件中放哪个插件，那个需要接收A组件的什么值