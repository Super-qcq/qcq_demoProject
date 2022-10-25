// 每个文件都可当做一个模块
// 在服务器：模块的加载是运行时同步加载的
// 下载第三方的包的时候--save必须要加  是将依赖写进package.json中。而node5之后不用加
// 引入第三方的库 let xxx = require('xxx')
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
