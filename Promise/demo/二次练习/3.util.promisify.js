const util = require('util')
const fs = require('fs')
let result = util.promisify(fs.readFile)
result('./文本文件/age.md').then(value=>{
  console.log(value.toString())
})