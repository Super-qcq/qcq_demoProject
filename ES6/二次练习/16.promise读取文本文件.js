const fs = require('fs')
const p = new Promise((resolve,reject)=>{
  fs.readFile('./文本文件/name.md',(err,data)=>{
    if(err) reject(err)
    resolve(data)
  })
})
p.then(value=>{
  console.log(value.toString())
},reason=>{
  console.error('读取失败')
})
