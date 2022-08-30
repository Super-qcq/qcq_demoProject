//express服务器框架：基于node.js平台（用于ajax给服务端发请求）
//1.最外层文件下右键在集成终端中打开 2.安装express包 npm init --yes(npm是node.js平台下的包管理工具) 3.安装express框架npm i express 
//4.最后启动服务 右键终端打开  node +tab
//5.浏览器 localhost:8080
//停掉服务CTRL+c
//安装nodemon(npm install -g nodemon)(帮助我们自动重启服务 当文件内容修改时  经常修改服务端代码  经常重启很麻烦)
//启动端口npx nodemon +tab

//1.引入express
const { response } = require('express')
const express = require('express')
const { request } = require('http')
//2.创建引用对象
const app = express()
//3.创建路由规则
   //request对请求报文的封装
   //response对响应报文的封装
app.get('/',(request,response) =>{
    response.send('hello-3 express')

})
//4.监听端口启动服务
app.listen(8080,() =>{
    console.log('服务已经启动，8080，端口监听中')
})