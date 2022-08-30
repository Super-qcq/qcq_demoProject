// import * as m1 from "./40.ES11-动态import2.js"; // 传统静态导入
//获取元素
const btn = document.getElementById('btn');
btn.onclick = function () {
  import('./40.ES11-动态import2.js').then(module => {
    module.hello()
  })
}