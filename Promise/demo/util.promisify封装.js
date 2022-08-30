// util.promisify 可以解决 错误优先的回调  会返回一个promise的版本
// 会将只要是回掉函数的风格的方法自动封装成 promise 方法
//引入fs模块
const fs = require('fs')
//引入util模块
let ut = require('util').promisify(fs.readFile)//会返回一个新的函数  返回结果是一个promise对象
ut('./promises实践练习-读取文件/file/李蕊.md').then(value=>console.log(value.toSring(),reason=>console.log(reason)))