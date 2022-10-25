// 汇集模块的地方
(function () { 
    requirejs.config({
        baseUrl:'AMD-require--requireJs/',//出发点在根目录下
        paths: {
            dataServices: './moudles/dataServices',
            alerter: './moudles/alerter',
        }
    })
    requirejs(['alerter'], function (alerter) { 
        alerter.showMsg()
    })
})()
