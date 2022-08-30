    组件优化：
    Component的2个问题
    1.只要执行setState(),即使不改变状态数据,组件也会重新render() ==>效率低
    2.只当前组件重新render(),就会自动重新render子组件,纵使子组件没有用到父组件的任何数据==>效率低
    效率高的做法只有当组件的state或props数据发生改变时才重新render()
    原因Component中的shouldComponentUpdate()总是返回true,相当于更新阀门
    解决办法1:
    重写shouldComponentUpdate()方法比较新旧state或props数据,如果有变化才返回true,如果没有返回false
    
    shouldComponentUpdate(nextProps,nextState){
    if( this.state.name === nextState.name){
    return false
    }else{
    return true
    }
    }

    办法2: 使用PureComponent
    PureComponent重写了 shou1dComponentUpdate(), 只有state或props数据有变化才返回true注意:
    只是进行state和props数据的浅比较,如果只是对象内部数据变了（还是之前哪个对象，只是改了属性值）,返回false。不要直接修改state数据,而是要产生新数据。项目中一般使用PureComponent来优化

    情况1：
    state = {name:'qcq'}
    const obj = this.state
    obj.name = 'lr'
    setState(obj)
    这里的obj还是之前的哪个对象，是之前的state  PureComponent阀门会自动返回false
    必须如下这样改，{}里面创建的是一个新对象，与之前的 state={name:'qcq'}地址不同
    this.setState({name:'lr'})

    如果需要进行添加 需要用这种方式，不能用unshift 因为这种方式 用对象字面量的形式创建，不是原来的对象
    const {name} = this.state
    this.setState({name:['xiaoLiu',...this.state.name]})
    


