//备注：node文件名称为uploadServer.js
//01 导入模块(需先通过npm来进行安装)
var express   =   require('express');     
var multer    =   require('multer');         
var body      =   require('body-parser'); 
​
var app = express();
app.listen(5000);
app.use(body.urlencoded( { extended: false } ));
app.use(multer( { dest: './upload/' } ).any());
​
//02 监听网络请求并设置打印接收到的参数信息
app.post('/api', function (req,res){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send("Nice ! 上传成功 ~ ");
​    console.log(req.body);      //普通POST数据
    console.log(req.files);     //文件POST数据
});
app.use(express.static('./html/'));