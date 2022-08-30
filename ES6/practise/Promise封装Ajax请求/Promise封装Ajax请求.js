//1.引入express
const { response } = require('express')
const express = require('express')
const { request } = require('http')
//2.创建引用对象
const app = express()
//3.创建路由规则
   //request对请求报文的封装
   //response对响应报文的封装
app.all('/Promise',(request,response) =>{
    //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
    //设置响应头设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    response.send('hello Promise')

})
//4.监听端口启动服务
app.listen(8080,() =>{
    console.log('服务已经启动，8080，端口监听中')
})