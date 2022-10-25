// Browserify
// 称为 CommonJS 的浏览器端的打包工具
// dist打包后放置的文件
let uniq = require('uniq')
let moudle1 = require('./moudles/moudles1')
let moudle2 = require('./moudles/moudles2')
let moudle3 = require('./moudles/moudles3')
console.log(moudle1.addX())
moudle2.addX()
console.log(moudle2.arr)
let result = uniq(moudle2.arr)
console.log(result)
console.log(moudle3.addX())
