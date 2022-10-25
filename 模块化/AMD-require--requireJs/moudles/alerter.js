// 定义有依赖的模块，将依赖当作形参传入，也可自己命名，至于是怎么找到的依赖模块它会有一定的配置
define(['dataServices'],function (dataServices) { 
    let msg = 'alerter'
    function showMsg() { 
        console.log(msg, dataServices.getName())
    }
    // 暴露模块 对象
    return {showMsg}
})
