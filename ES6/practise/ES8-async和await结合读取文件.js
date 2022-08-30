// // 1、引入 fs 模块 
        // const fs = require("fs");
        // // 2、调用方法，读取文件 
        // fs.readFile("../file/齐存强.md",(err,data)=>{    
        //     // 如果失败则抛出错误    
        //     if(err) throw err;    
        //     // 如果没有出错，则输出内容    
        //     console.log(data.toString()); 
        // });
        function file(address){
            return new Promise((resove,reject)=>{
                const fs = require("fs")
                    fs.readFile(address,(err,data)=>{
                        if(err) reject(err)
                        resove(data.toString())
                    })
                })
        }
        async function fun(){
           try{
            const result1 = await file('../file/齐存强.md')
            console.log(result1.toString())
            const result2 = await file('../file/狗子.md')
            console.log(result2.toString())
            const result3 = await file('../file/李蕊.md')
            console.log(result3.toString())
           }
           catch(e){
               console.error(e)
           }
        }
        fun()
