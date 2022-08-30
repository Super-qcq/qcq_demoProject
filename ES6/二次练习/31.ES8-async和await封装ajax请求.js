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
app.all('/servers',(request,response) =>{
  //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
  //设置响应头设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers','*')
  response.send('hello header')

})

app.all('/json',(request,response) =>{
    //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
    //设置响应头设置允许跨域
    response.setHeader('Access-Control-Allow-Origin','*')
    response.setHeader('Access-Control-Allow-Headers','*')
    const person = {
      name:'json'
    }
    let result = JSON.stringify(person)
    response.send(result)

})
app.all('/ie',(request,response) =>{
  //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
  //设置响应头设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers','*')
  const person = {
    name:'ie'
  }
  let result = JSON.stringify(person)
  response.send(result)

})
app.all('/error',(request,response) =>{
  //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
  //设置响应头设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers','*')
  const person = {
    name:'请求超时和网络异常'
  }
  let result = JSON.stringify(person)
  setTimeout(function(){
    response.send(result)
  },3000)

})
app.all('/cancel',(request,response) =>{
  //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
  //设置响应头设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers','*')
  const person = {
    name:'请求超时和网络异常'
  }
  let result = JSON.stringify(person)
  setTimeout(function(){
    response.send(result)
  },3000)

})
app.all('/jsonp-check',(request,response) =>{
  //运用jsonp html标签存在跨域的原理解决跨域问题
  var result = {
    msg:'此用户名不能被使用'
  }
  let data = JSON.stringify(result)
  response.end(`handle(${data})`)

})
app.all('/ajax',(request,response) =>{
  //如果URL路径请求行的第二段内容是server 则执行回调函数里的代码 并且由response做出响应
  //设置响应头设置允许跨域
  response.setHeader('Access-Control-Allow-Origin','*')
  response.setHeader('Access-Control-Allow-Headers','*')
  const person = {
    name:'promise封装ajax请求'
  }
  let result = JSON.stringify(person)
  setTimeout(function(){
    response.send(result)
  },3000)

})

//4.监听端口启动服务
app.listen(8080,() =>{
    console.log('服务已经启动，8080，端口监听中')
})