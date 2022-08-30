Hook为函数式组件提供
    (1). Effect Hook 可以让你在函数组件中执行副作用操作(用于模拟类组件中的生命周期钩子)(2). React中的副作用操作:发ajax请求数据获取设置订阅/启动定时器手动更改真实DOM
    (3).语法和说明:
    会传入一个函数，相当于一个生命周期钩子
    React.useEffect (() => {//在此可以执行任何带副作用操作
      return () => {// 在组件卸载前执行  函数中所返回的那个函数就是componentwi11Unmount
        //在此做一些收尾工作,比如清除定时器/取消订阅等
        }
      }, [stateValue]) // 如果指定的是[],回调函数只会在第一次render ()后执行

      如果不写第二个参数，则所有的可变参数都会受到监视。
      如果[]中没有值，空数组。谁也不检测，相当于一挂载就显示 显示1次 componentDidMount
      如果[]有一个参数，则只会监视一个，一挂载就显示，参数改变也显示。显示n+1次 componentDidupdate
      函数中所返回的那个函数就是componentwi11Unmount
    (4).可以把useEffect Hook 看做如下三个函数的组合
      componentDidMount()
      componentDidupdate()
      componentwi11Unmount()