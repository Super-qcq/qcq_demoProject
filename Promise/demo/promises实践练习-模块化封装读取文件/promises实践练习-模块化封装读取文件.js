// const fs = require('fs')
// fs.readFile('./file/齐存强.md',(err,data)=>{
//     if(err) throw err
//     console.log(data.toString())
// })
function mineReadFile(path){
    return new Promise((resove,reject)=>{
        const fs = require('fs')
        fs.readFile(path,(err,data)=>{
            if(err) reject(err)
            resove(data)
        })
    })
}
mineReadFile('./file/狗子.md').then(value=>console.log(value.toString()),reason=>console.log(reason))






// const pr = new Promise((resove,reject)=>{
//     const fs = require('fs')
//     fs.readFile('./file/齐存强.md',(err,data)=>{
//         if (err) reject (err)
//         resove(data)
//     })
// })
// pr.then(value=>console.log(value.toString()),reason=>console.log(reason))