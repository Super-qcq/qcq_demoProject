//1.引入express
const { response } = require('express')
const express = require('express')
const { request } = require('http')
const app = express()
//jsonp服务 返回前端解析的js代码
app.all('/jsonp-jQuery',(request,response) =>{
    const data={
       name:'qcq',
       city:['bj','sh','sx']
    }
    //将数据转化为字符串
    let str = JSON.stringify(data)
    //接收callback参数
    let cb = request.query.callback
    //返回结果
    response.end(`${cb}(${str})`)//end不会加特殊响应头
    // response.send("console.log('jsonp')")
})
app.listen(8080,() =>{
    console.log('服务已经启动，8080，端口监听中')
})