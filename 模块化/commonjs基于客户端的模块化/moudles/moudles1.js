// CommonJS规范规定，每个模块内部，module变量代表当前模块。
// 这个变量是一个对象，它的exports属性（即module.exports）是对外的接口。加载某个模块，其实是加载该模块的module.exports属性。
//module.exports上面不能无限添加属性，下面的属性会将上面的属性覆盖
var x = 5;
module.exports.addX = function (value) {
  return x;
}