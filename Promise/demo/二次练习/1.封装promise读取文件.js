function myReadFile(url){
  return new Promise((resolve,reject)=>{
    const fs = require('fs')
    fs.readFile(url,(err,data)=>{
      if(err) reject(err)
      resolve(data)
    })
  })
}
myReadFile('./文本文件/name.md').then(value=>{
  console.log(value.toString())
},reason=>{
  console.warn(reason)
})