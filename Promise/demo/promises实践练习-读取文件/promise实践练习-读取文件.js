// const fs = require('fs')
// fs.readFile('./file/齐存强.md',(err,data)=>{
//     if(err) throw err
//     console.log(data.toString())
// })

const pr = new Promise((resove,reject)=>{
    const fs = require('fs')
    fs.readFile('./file/齐存强.md',(err,data)=>{
        if (err) reject (err)
        resove(data)
    })
})
pr.then(value=>console.log(value.toString()),reason=>console.log(reason))