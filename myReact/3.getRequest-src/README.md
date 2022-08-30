3000端口给5000发送请求存在跨域问题:
脚手架配置代理：客户端3000端口 给 服务端5000端口 发请求 ，中间设置一个代理人（没有ajax引擎：产生跨域的本质是ajax引擎拦截了请求 不存在跨域问题，同源策略不限制）
中间人的端口：为客户端的端口
客户端先给3000发 中间人接住请求 发给5000端口  没有跨域 5000端口返回数据

配置方法1：
package.json中加一个配置："proxy":"http://localhost:5000"
然后将自己的发送页面的发送目标地址改为自己的地址3000 先给自己发
axios.get('http://localhost:3000/students')先在自己端口里找没有students 才发给5000 
并不是配置了代理，所有的请求都会通过代理，而是本地端口没有的请求才会询问代理端口。
但是这种方法只能解决一个请求 一个代理的问题

配置方法2：
可以配置多个代理
不用在package.json中写任何东西，在src下创建一个名叫setupProxy.js文件里面用 CJS的方式写：
const {createProxyMiddleware} = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        createProxyMiddleware('/api1',{//遇见api1前缀的请求，就会触发该代理配置
            target: 'http://localhost:5000',//转发给5000
            changeOrigin: true,//控制服务器收到的请求头中host的值  在服务器端可以输出 该请求来自于request.get('Host')
            pathRewrite: {'^/api1':''}//将api1换成空格  重写请求路径 正则匹配
        }),
        createProxyMiddleware('/api2',{
            target: 'http://localhost:5001',//下一个代理
            changeOrigin: true,
            pathRewrite: {'^/api2':''}
        })
    )
}
前端代码中
axios.get('http://localhost:3000/api1/students')必须在3000后面写api1  如果3000下没有自己所要的数据 就走api1配置的路径下在5000中找

