// // 1、引入 fs 模块 
// const fs = require("fs");
// // 2、调用方法，读取文件 
// fs.readFile("../file/齐存强.md",(err,data)=>{    
//     // 如果失败则抛出错误    
//     if(err) throw err;    
//     // 如果没有出错，则输出内容    
//     console.log(data.toString()); 
// });
//Promise封装
const p = new Promise(function(resove,reject){
    const fs = require("fs")
    fs.readFile("../file/齐存强.md",(err,data)=>{    
        // 如果失败则抛出错误    
        if(err) reject(err);   
        // 如果没有出错，则输出内容    
        resove(data.toString()) 
    });
})
p.then(value=>{
    console.log(value)
},season=>{
    console.log(season)
})
