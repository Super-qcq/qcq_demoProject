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