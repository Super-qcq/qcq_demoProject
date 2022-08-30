上层文件app.js和index.js
执行顺序 index.js-> index.html->app.js

App.js文件要大写
index.js入口文件中 脚手架帮我们安装好了各种库  引入库,渲染,引入App组件
App中 创建外壳组件
      引入react
      默认暴露app

不是解构赋值 conmponent  用的是分别暴露
创建并暴露app组件

将app中的组件单独创建
      引入react
      app中引入组件，所有的组件放在compoent文件夹下
      暴露(export default默认暴露-import App from ...，分别暴露和{ 统一暴露} ，接收import{...}from ...解构赋值形式，普通形式 import * as ...from ...)


组件中有自己的css 并引入该组件自己的组件，文件夹首字母大写


组件后缀名：业务逻辑js为.js结尾，组件为.jsx结尾

公司结构：不同组件文件夹里的index可以一样 可以引入时缩写

组件化：实现界面局部功能代码和资源的结合

样式模块化：
      不同组件的同名css样式会出现冲突  后面可能覆盖前面的
      less文件中的外部可以写 组件名包裹起来如.Hello{.title{} }
