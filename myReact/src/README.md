16.antd-src

1.下载antd cnpm install antd
2.引入antd import {Button} from 'antd'
3.引入样式 import 'antd/dist/antd.css'
4.官网右边API表示组件的配置选项





5. 按需引入（不能将antd所有的配置都加进来，文件太大），点击官网文档3.x版本，在creat-react-app中使用，高级配置
修改脚手架配置，config-overrides.js可以知道你要改谁 改成什么样子，写的是规则，那如何找到这个文件，就要借助customize-cra这个库执行修改按照config-overrides.js所指定的规则去修改脚手架，那就不能用原来脚手架启动的命令了 必须用react-app-rewired 去启动
安装：cnpm install react-app-rewired customize-cra  用于启动脚手架和执行修改命令
更改启动命令：在package.json中将所有scripts中的每一项启动命令改为 react-app-rewired开头

在根目录创建config-overrides.js文件 配置具体修改规则 拿到原始的配置

引入babel
最终删除css样式的引入 即可成功


6.antd自定义主题：
需要修改less底层代码  
安装：cnpm install less less-loader
在config-overrides.js修改配置 
const {override,fixBabelImports,addLessLoader} = require('customize-cra')
更改配置：style:true
加入addLessLoader配置 允许修改antd底层的less文件
修改变量 存储主题颜色的变量改成我自己想要的颜色 
addLessLoader({
  lessOptions:{
    javascriptEnabled:true,
    modifyVars:('@primary-color': 'orange')
  }
})



新版
按需引入+自定义主题：
    1.安装依懒：yarn add react-app-rewired customize-cra babel-plugin-import less less-loader
    2.修改package.json 
    ...
    //更改启动命令，必须用react-app-rewired 去启动
    "scripts":{
      "start":"react-app-rewired start", 
      "build":"react-app-rewired build",
      "test":"react-app-rewired test", 
      "eject":"react-scripts eject"
    },
    3.根目录下创建config-overrides.js(config-overrides.js可以知道你要改谁 改成什么样子，写的是规则)
    //配置具体的修改规则 
 const {
   override,
   fixBabelImports,
   addLessLoader
 } = require('customize-cra')
 module.exports = override(fixBabelImports('import', {
     libraryName: 'antd',
     libraryDirectory: 'es',
     style: true,
   }),
   //加入addLessLoader配置 允许修改antd底层的less文件。修改变量 存储主题颜色的变量改成我自己想要的颜色   
   addLessLoader({
     lessOptions: {
       javascriptEnabled: true,
       modifyVars: {
         '@primary-color': 'green'
       },
     }
   }),
 );
4.备注:不用在组件里亲自引入样式了,即: import 'antd/dist/antd.css'应该删掉













最新4.0版本：
此时我们需要对 create-react-app 的默认配置进行自定义，这里我们使用 craco （一个对 create-react-app 进行自定义配置的社区解决方案）。

现在我们安装 craco 并修改 package.json 里的 scripts 属性。

$ yarn add @craco/craco
/* package.json */
"scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
}
然后在项目根目录创建一个 craco.config.js 用于修改默认配置。

/* craco.config.js */
module.exports = {
  // ...
};
自定义主题#
按照 配置主题 的要求，自定义主题需要用到类似 less-loader 提供的 less 变量覆盖功能。我们可以引入 craco-less 来帮助加载 less 样式和修改变量。

首先把 src/App.css 文件修改为 src/App.less，然后修改样式引用为 less 文件。

/* src/App.js */
- import './App.css';
+ import './App.less';
/* src/App.less */
- @import '~antd/dist/antd.css';
+ @import '~antd/dist/antd.less';
然后安装 craco-less 并修改 craco.config.js 文件如下。

$ yarn add craco-less
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
这里利用了 less-loader 的 modifyVars 来进行主题配置，变量和其他配置方式可以参考 配置主题 文档。修改后重启 yarn start，如果看到一个绿色的按钮就说明配置成功了。

antd 内建了深色主题和紧凑主题，你可以参照 使用暗色主题和紧凑主题 进行接入。
    
 