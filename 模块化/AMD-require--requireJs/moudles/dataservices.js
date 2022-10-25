// 定义没有依赖的模块
define(function () { 
    let name = 'dataServices'
    function getName() { 
        return name
    }
    // 暴露模块 对象
    return {getName}
})