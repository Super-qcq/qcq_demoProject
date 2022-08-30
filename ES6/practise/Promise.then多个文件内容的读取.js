// // 1、引入 fs 模块 
// const fs = require("fs");
// // 2、调用方法，读取文件 
// fs.readFile("../file/齐存强.md",(err,data)=>{    
//     // 如果失败则抛出错误    
//     if(err) throw err;    
//     // 如果没有出错，则输出内容    
//     console.log(data.toString()); 
// });
const p = new Promise((resove,reject)=>{
    const fs = require("fs");
    fs.readFile("../file/齐存强.md",(err,data)=>{
        // if(err) throw err; 
        resove(data) 
    })
})
p.then(value=>{//此value是一个promise对象 对象值得类型是上面文件值的类型
    return new Promise((resove,reject)=>{//返回一个promise对象  对象内容是一个promise类型  下一个then参数得状态由此 状态决定
        const fs = require("fs");
        fs.readFile("../file/李蕊.md",(err,data)=>{
            // if(err) throw err; 
            resove([value,data])//放到数组里 
        })
    })
}).then(value=>{
    return new Promise((resove,reject)=>{
        const fs = require("fs");
        fs.readFile("../file/狗子.md",(err,data)=>{
            // if(err) throw err;
            value.push(data)//将三次获取都压入数组 
            resove(value) 
        })
    })
}).then(value=>{
    console.log(value.join('\n\t'))//join将数组转为字符串
})