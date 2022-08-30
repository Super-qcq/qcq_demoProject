//1.引入express
const { response } = require('express')
const express = require('express')
const { request } = require('http')
//2.创建引用对象
const app = express()
//3.创建路由规则
   //request对请求报文的封装
   //response对响应报文的封装
app.get('/server',(request,response) =>{
    //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
    //设置响应头设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    response.send('hello 请求')

})
//all可以接收任意类型的请求
app.all('/server',(request,response) =>{
    //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
    //设置响应头设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    //设置响应头
    response.setHeader('Access-Control-Allow-Headers','*')
    response.send('hello post请求头信息')

})
//4.监听端口启动服务
app.listen(8080,() =>{
    console.log('服务已经启动，8080，端口监听中')
})