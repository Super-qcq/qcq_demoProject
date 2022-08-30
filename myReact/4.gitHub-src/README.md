静态页面：
       将所有的html标签先放在App中，然后再将所有的class换成className,将所有的style=""换成style={{}}。
       将公共的css，如外部引入的bootstrap.css放在public下 然后用link引入index.html中。
       然后对各个组件进行拆分，放到components下的各组件文件夹中，然后将路径引入App中。
       最后将各个组件的css放入对应的组件文件夹中。
       最后运行排错
发送请求：

      补充：
      
      遍历：
      return <div>
        {myId.map((item,index)=>//设置唯一key
         <li key={index}>{item}</li>)}
        </div>


      ref的使用
        <input ref={c=>this.input2=c/> this.input2.value获取输入的值


      自身失去焦点事件event,target:
         //如果是点击事件之后操作的是本身 就可以不用ref   直接用event.target实现（发生事件的元素正好是你要操作的元素时）
      blurData=(event)=>{
        alert(event.target.value)
      }



   
    实时记录值onChange+高阶函数：
 state = {
        username:'',
        password:''
      }
      render() {
       return (
         <div>
          <form action="" onSubmit={this.showData}>
            用户名：<input onChange={this.saveFormatData('username')} type="text"/>&nbsp;
            密码：<input onChange={this.saveFormatData('password')} type="password"/>&nbsp;
            <button>提交</button>
            </form>
          </div>
       ) 
      }
      //这样保存可以减少代码的冗余 将所有数据都保存到saveFormatData中  其实调用的是内层函数 设置的值是自己的value值
      saveFormatData=(typeData)=>{
        return (event)=>{
          this.setState({[typeData]:event.target.value})
        }
      }
        componentDidMount() =====> 常用
        一般在这个钩子中做一些初始化的事，例如：开启定时器、发送网络请求、订阅消息
        componentWillUnmount()  =====> 常用
        一般在这个钩子中做一些收尾的事，例如：关闭定时器、取消订阅消息



      自己在后端创建了跨域资源共享请求头，不存在跨域问题，但是上线的项目一般不用cors解决跨域问题 不安全
      解构赋值的连续写法 获取ref上输入的值 const{keyWord:{value}} = this//从this身上拿到keyWord 再从keyWord身上拿到value
      demo:连续解构赋值并且重命名 
      let obj = {
       a:{
         b:1 
         }
      }
      const {a:{ b: data}} = obj  那么b就被换成了data
      请求路径中要配置代理，站在自己的端口给自己发的话localhos:3000可以省略不写，请求关键词用模板字符串传入请求参数中，则 
       axios.get(`/api1/search/users2?q=${keyWord}`).then(response => 
          console.log('成功了',response.data)
      ,error=>{console.log('失败了',error)}
      )

      在父组件中想要得到子组件上的方法  在父组件中写子组件的同时  在子组件的ref上直接找到它的函数名就可以

      状态定义在App中那么更改状态也就在App中

      展示数据：search搜索出来的东西要先交给App(父给子传一个函数，子调用函数时（用this.props.函数名）就把数据传给父),App再传给List用扩展运算符传{...this.state}(List用props取数据)，在App中初始化状态，操作状态的方法也就在App中
      
      搜索：获取用户输入的值 可以通过ref里的this.input.value 直接拿到，也可以通过标签onchange加函数柯里化放到状态里连同属性名一起  回传到App给Search的函数中 在App中setState处理之后 再传回来。在search中用this.props接收 放到发送请求中
      搜索按钮点击之后获取用户输入的关键词，并发送请求 将请求回来的数据对象传给App(父给子传一个函数，子调用时就把数据传给父)， App将数据传给List展示(App中List组件定义属性users={this.state.users}或扩展运算符{...this.state}传，在List中用this.props接收，并遍历 map遍历会有返回值)


      其他状态：其实当请求时会有以下状态，当页面打开时有欢迎词，当点击搜索时有加载中，当请求错误时有错误数据
      所以state中有以下这些数据
       // 初始化状态 1.用户信息  2.第一次请求欢迎词  3.loading加载中   4.请求失败信息
         state={
            users:[],
            isFrist:true,
            isLoading:false,
            err:''
          }
        将这些所有状态全部放在一个状态对象中初始化 然后search组件将这些对象处理后作为函数的参数 回传在App中用setState处理到状态中 然后通过扩展运算符传给List组件 在不同的时候做展示
        需要注意：
        1.在search中如果请求失败传的是失败的信息：
        error=>{ this.props.updateState({isLoading:false,err:error.message})})
        2.在展示的时候作为状态判断时可用三目运算符+map遍历
        3.（订阅）前面的页面只负责定义状态和传一个函数updateState={this.updateState}  和接收状态对象值用函数接收并且函数中 setState()做处理，（发布）在另一个页面中的状态名和之前页面的没有关系只负责将最新的状态对象传回去 this.props.updateState({}) 但{}里的属性名同名就好，（
        
        前一个页面：
         state={
            q:'',
            users:[],
            isFrist:true,
            isLoading:false,
            err:''
          }
        updateState=(stateObj)=>{
                        this.setState(stateObj)
                   }
        另一个页面：this.props.updateState({isFrist:false,isLoading:true})
        


        子给父传数据 父给子传一个函数子将数据放到函数参数中，父给子传数据直接放在标签中传