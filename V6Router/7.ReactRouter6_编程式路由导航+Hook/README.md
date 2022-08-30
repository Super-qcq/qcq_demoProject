Link和NavLink 必须要点击才能实现路由的跳转。
Navigate必须要渲染到页面上才能实现路由的跳转和视图的切换。
使用useNavigate()实现编程式的路由导航，可以实现点击button 再跳转到对应的路由组件，也可以一边跳转并传过去数据，还可以实现push和replace跳转，也可以前进和后退

目前只支持state参数传递，如果需要传递params和search参数  需要在路由导航的路径里面带入
 navigate('detail',  在''里面写参数   同时如果携带params参数 在注册路由时需要接收
 


  // 用useNavigate()进行编程式路由导航，可以指定跳转方式，携带参数，还可以前进后退
  const navigate = useNavigate()
  function showDetail(items){
    navigate('detail',
    {
     replace:false,
     state:{
      id:items.id,
      title:items.title,
      content:items.content
     }
    })
  }


  前进后退：
  // 编程式路由导航 useNavigate进行前进和后退
  const navigate = useNavigate()
  function back(){
    navigate(-1)
  }
  function forward(){
    navigate(1)
  }