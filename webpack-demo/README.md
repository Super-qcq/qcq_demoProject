 webpack原理：使用一个入口文件，找到其依赖的模块或者内容进行编译，最终解析为浏览器可识别的文件，然后进行压缩之后输出。

打包 npm init --yes 在package.json中scripts中加  "build":“webpack” 通过build命令直接执行webpack
通过npm run build执行webpack  用webpack对项目进行打包  src打包到dist目录下就成功了 



1.html-webpack-plugin—html插件能帮助我们在打包时自动地生成html文件，可以很容易的帮我们在里面引入所有的js文件
所以还得安装一个webpack插件cnpm i -D html-webpack-plugin，才能生成html文件
在上面的基础上进行配置该插件

在webpack.config.js中引入插件
// 引入一个包
const path = require('path');
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');

配置webpack插件  生效   在里面也可以改生成的html的title
可以按照我们的需求 去设置一个html模板 再生成的html网页根据我们的模板生成
//配置Webpack 插件
    plugins: [
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title"、
            template: "./src/index.html"//根据这个html从而生成对应样式的html 
        }),
    ],
    

npm  run build 将html文件会放在dist下




2.cnpm i -D webpack-dev-server开发服务器   安装了一个内置服务器 可以根据项目的改变自动刷新,执行之后在项目改变后就不用手动编译  会自动变化
在package.json中加上start命令  在scripts中"start":"webpack serve --open"启动webpack服务器并且用chrome打开网页
 "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "dev": "webpack --mode development",
    "build": "webpack --mode production",
    "start": "webpack serve --open"
  },
// 配置服务器 端口
    devServer: {
      port: 8088,
      static:'./public',
    },
// 开发模式使用，方便查错误
  devtool: "inline-source-map",
  mode: "development",

npm start   直接自动打开网页并且实时更新



3.clean-webpack-plugin—clean插件:
cnpm i -D clean-webpack-plugin 作用 在每一次编译前把之前的目录清空 保证编译都是最新文件 避免旧文件的遗留
在webpack.config.js中引入插件
//引入clean插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

在plugin数组中注册
//配置Webpack 插件
    plugins: [
    	new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            // title: "这是一个自定义的title"、
            template: "./src/index.html" 
        }),
    ],



4.让webpack知道哪些文件可以作为模块被引入  webpack.config.js
resolve:{//用来设置引用模块
//扩展名
extensions  以ts和js结尾文件  都可以作为模块使用
  resolve: {
        extensions: ['.ts', '.js']
    }






5.bable  将新语法转为旧语法  浏览器兼容问题 结合webpack去使用
安装依赖：cnpm i -D @babel/core @babel/preset-env  babel-loader  core-js（四个）

@babel/core—babel核心的工具 
@babel/preset-env—babel的预设环境 兼容不同的浏览器环境
babel-loader—babel与webpack结合的工具
core-js—模拟js运行环境（使用时可以按需引入）老版本浏览器兼容新浏览器
顺序 ts-loader将ts代码转为js代码   用babel再将js新版本代码转为js旧版本代码  从下往上执行
use: [
                    // 配置babel
                    {
                        //指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            //设置预定义的环境
                            presets: [
                                [
                                    //指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器及版本
                                        targets: {
                                            "chrome": "58",
                                            "ie": "11"
                                        },
                                        //指定corejs的版本（根据package.json中的版本，只写整数）
                                        "corejs": "3",
                                        //使用corejs的方式 "usage"  表示按需加载 处理promise等等语句
                                        "useBuiltIns": "usage" 
                                    }

                                ]
                            ]
                        }
                    },
                
                    'ts-loader'
                ],
webpack执行



6.告诉webpack不使用箭头函数中   environment
 output: {
    //指定打包文件的目录
    path: path.resolve(__dirname, "dist"), //通过path把路径拼出来
    filename: "bundle.js", //打包后的文件名
    environment: {
      arrowFunction: false, // 关闭webpack的箭头函数，可选 告诉webpack不使用箭头函数
    },
  },


node+babel+ts配置


安装node之后就自动的安装好npm
npm list -g --depth 0  查看已经安装的包
安装淘宝镜像，安装之后 npm命令变成cnpm   
npm install -g cnpm --registry=https://registry.npm.taobao.org 

下载工具： cnpm install jquery -g （其中-g指的是全局）

查看当前 npm全局安装路径位置的命令是：npm config get prefix

删除安装包  npm uninstall -g <包名>
使用 npm 卸载插件 ， 语法格式为： npm uninstall <name> [-g][--save-dev]
3.1 不要直接本地删除插件包

3.2 删除全部插件，语法为： npm uninstall gulp-less gulp-gulify gulp-concat ...
3.3 借助rimraf一次性删除： npm install rimraf -g ，用法 rimraf node_modules

4、使用 npm 更新插件，语法为： npm update <name> [-g] [--save-dev]
4.1 更新全部插件：```npm update [--save-dev]

5、查看 npm 帮助， 语法为： npm help

6、查看已装插件，语法为： npm list

更新程序包  cnpm outdated -g --depth=0 如果返回的前后包的版本不一致 说明需要更新则   npm install -g <包名>

当一个项目的基本文件目录结构创建，按照现在前端开发工程师的一个习惯，都会在项目根目录下创建一个 package.json 文件，触发该文件创建的命令是：npm init

 根据提示进行配置，每步完成按回车键确认。通常第一个出现的配置项是name，表示当前项目的名称，名称的设置有以下五个要求：

 （1）英文字符必须是全部小写的

 （2）名称间不能出现空格（如：test webpack）

 （3）名称不得过长

 （4）不能为中文

 （5）可以使用连接线（-）和下划线（_）否则都会错误并要求重新输入。
 
  这里再说说其它填写项的作用：

 version
  —— 表示配置文件的版本号。可跳过

 description
  —— 配置文件描述文本。可跳过可手动输入

 entry point
  —— 入口JS文件。可跳过可手动输入

 test command
  —— 快捷命令设置。可跳过

 dependencies
  —— 依赖。可跳过，后续自动生成

 keywords
  —— 关键字设置。可跳过

 git repository
  —— git仓库。可跳过

 author
  —— 作者名称

 license: (ISC)
  —— 许可证，可跳过

实际上，如果你不喜欢这样繁琐的问答生成方式可以使用更快速的生成方式：

 npm init --yes

 使用这条命令的前提是你当前项目的命名满足规范，也就是上面提到name的那五个要求。（其实哪怕平时我们不使用npm构建项目的时候，也应该有这样良好的项目命名习惯，文件命名也是提升我们项目可扩展性的一个重要要求。）


背景：
由于文件及文件夹过多过碎，拷贝给别人时传输速度较慢，此时就需要把项目打包好之后再发给别人
一般情况下，打包命令为：npm run build
但比如我们公司就是: npm run zz(zz是项目名称)
（cnpm i 包名 --save 添加’–save‘ 是为了把包存入webpack中）
但有时候公司的项目可能不存在build命令，这时就要查看package.json文件，查找当前项目的打包命令;
一般情况下打包后的文件名是: dist，如果需要发给别人一定要压缩一下再发

二、package.json的作用
package.json是一个项目描述文件, 里面记录了当前项目的信息。eg: 项目名称、版本、作者、gitHub地址、当前项目依赖哪些第三方模块等。 使用npm安装第三方模块，是模块的相关信息会自动添加到package.json文件中



package.json
package.json文件，它定义了这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、作者、license等信息）。

tsconfig.json
tsconfig.json 文件，它指定了用来编译这个项目的根文件和编译选项。

不带任何输入文件的情况下调用 tsc 命令，编译器会从当前目录开始去查找 tsconfig.json 文件，逐级向上搜索父目录。
当命令行上指定了输入文件时，tsconfig.json 文件会被忽略。

node_modules
node_modules 文件夹是项目的所有依赖包，package-lock.json 文件将项目依赖包的版本锁定，避免依赖包大版本升级造成不兼容问题。






babel项目转换 es6->es5  jsx->js
第一步：安装工具babel-cli（命令行工具） babel-preset-env（ES转换工具） browserify（打包工具， 项目中使用的是webpack）；
第二步：初始化项目
npm init -y	
第三步：安装
npm i babel-cli babel-preset-env browserify	
第四步：使用babel转换
npx babel js（js目录） -d dist/js（转化后的js目录） --presets=babel-preset-env	
第五步：打包
npx browserify dist/js/app.js -o dist/bundle.js	
第六步：在使用时引入bundle.js





 1. Webpack 介绍

1-1. 什么是 Webpack

文档: https://webpack.docschina.org/

Webpack 是一个模块打包器 (bundler)，本质就是一个工具包。 

在 Webpack 看来，项目源码中所有的静态资源文件都是模块，如 JS / JSON / CSS / LESS / IMG / FONTS 等等，这些文件都会作为模块来处理。

Webpack 会根据模块之间的依赖关系，进行分析打包所有在整个依赖图中的模块资源，生成最终的浏览器能高效运行的静态资源。





1-2. 五个核心概念

Webpack 有五个核心的概念需要知道，分别是

- Entry 		入口
  Output		出口/输出
   Loader		加载器
   Plugin		插件
   Mode		    模式

Entry 入口

入口起点(entry point) 指示 webpack 应该使用哪个模块，来作为构建其内部依赖图的开始。进入入口起点后，webpack 会找出有哪些模块和库是入口起点依赖的



Output 出口

Output 属性告诉 webpack 在哪里生成(输出)打包文件(bundles)，以及如何命名打包文件



Loader 加载器

Webpack 默认只能处理 JS / JSON 文件，如果需要打包其他类型文件，就需要使用对应的 loader 进行处理。例如 css-loader，less-loader，babel-loader 等等

Loader 本质是 JS 函数，接受源文件内容，返回转换后的结果内容



Plugin 插件

loader 用于转换某些类型的模块，而插件则可以用于执行范围更广的其它任务。包括：压缩文件，代码规范检查等



Mode 模式

Webpack 主要有两种工作模式，分别是 development 开发模式和 production 生产模式, 不同模式提供了不同的默认配置。



2. 安装 Webpack

- 全局安装（这一步暂时不需要做）

    npm install webpack webpack-cli -g

- 局部安装（选他，选他，选他）

    npm init -y
    npm install webpack webpack-cli -D   # cli  Command Line Interface 命令行接口

官方推荐使用『局部安装』，这样可以避免因为版本不同而产生的 BUG



3. Webpack 初体验

1. 创建JS模块: src/js/m1.js
       export const sum = (x, y) => {
         return x + y
       }
2. 创建JSON模块: src/json/movie.json
       [
         {
           "id": 1,
           "name": "让子弹飞",
           "director": "姜文"
         }
       ]
3. 创建入口JS模块: src/main.js
       import {sum} from './js/m1' // 引入js模块
       import movies from './json/movie.json' // 引入json模块
       
       console.log(sum(2, 3))
       console.log(movies)
       
       document.write('Hello Webpack!')
4. 创建HTML页面: public/index.html
       <!DOCTYPE html>
       <html lang="en">
       <head>
         <meta charset="UTF-8">
         <meta name="viewport" content="width=device-width, initial-scale=1.0">
         <title>Document</title>
       </head>
       <body>
         	
       </body>
       </html>
5. 安装
       npm init -y
       npm i webpack webpack-cli -D
6. 执行打包命令  『项目根目录下运行』 
       # 开发模式打包
       npx webpack --entry ./src/main.js  --output-path ./build/js --output-filename bundle.js --mode development
       
       # 生产模式打包
       npx webpack --entry ./src/main.js  --output-path ./build/js --output-filename bundle2.js --mode production
   - --entry  							 设置入口
   - --output-path               设置输出目录
     - --output-filename 		设置输出文件名
       --mode 				           设置运行模式
   区别 npm 与 npx ?
   - 它们都是由Node提供的2个工具, 用来做工具包的相关处理
   - npm (Node Package Manager) : 包管理器,  用来下载工具包
   - npx (Node Package Excuted) : 包扩展工具, 用来运行工具包命令
   - npx 查找工具包的顺序: 局部查找 ==> 全局查找 ==> 运行
7. HTML 文件引入打包文件
       <script src="../build/js/bundle.js"></script>
8. 打开页面测试效果
    

初体验需要改进的地方：

1. 打包命令太复杂
2. ES6 没有转为 ES5
3. 修改后必须手动重新打包, 不能自动重新打包
4. 只能打包 JS 和 JSON， 不能打包其他类型的文件

4. 使用配置文件打包

问题：打包命令太复杂(需要指定打包的各种配置信息)

解决：通过JS类型的配置文件来指定打包的配置信息

项目根目录下创建文件 webpack.config.js，内容如下：

    const {resolve} = require('path'); // path模块是Node内置的
    // __dirname：当前配置文件所在的目录绝对路径
    // resolve: 用来拼接路径的函数
    
    // 暴露配置对象
    module.exports = {
        // 入口
        entry: './src/main.js',
      
        // 出口
        output: {
            path: resolve(__dirname, 'build'), // 打包文件所在的根目录
            filename: 'js/bundle.js', // 打包生成的js文件名(可以带目录)
            clean: true, // 打包时, 会先自动清空打包文件夹
        },
       
        // 模式
      	// mode: 'production',
        mode: 'development',
    }

创建完毕之后，在项目根目录执行如下命令：

    npx webpack

5. 打包样式(原生的只能打包js和json,打包css需要用插件)

5-1. 打包 css 文件

问题：webpack本身只能打包 JS 文件和 JSON 文件, 不能打包CSS文件 

解决：利用css-loader & style-loader 对CSS进行打包处理

1. 首先先创建 HTML 结构与对应的 CSS 文件样式
   public/index.html
       <header></header>
   src/css/app.css
       header {
         height: 100px;
         background: rgb(95, 51, 93);
         display: flex;
       }
2. 在入口 JS 文件中 引入 CSS 文件

    import './css/app.css' // 引入css模块	

1. 安装 loader

    npm i style-loader css-loader -D

1. 修改 webpack.config.js 配置文件

    module.exports = {
        mode: 'development',
        
        // 配置 loader
        module: {
            rules: [
              	// 配置 css 文件处理
                {
                    test: /\.css$/, // 处理css文件
                    use: [
                        "style-loader",		// 将 CSS 生成 style 标签插入 HTML 中
                        "css-loader"  		// 将 CSS 转为 CommonJS 的模块
                    ]
                }   
            ]
        },
    }

1. 运行打包命令  『在项目的根目录下运行』

    npx webpack

5-2. 打包 less 文件

问题：在前台项目开发时, 很可能会使用CSS预编译器(less/sass/stylus)来快速编写页面样式, webpack不能处理

解决：利用less & less-loader 来对less样式进行打包处理

1. 首先编写 HTML 结构以及 LESS 文件样式
   public/index.html
       <section class="content">
       </section>
   src/less/app.less
       @bg: rgb(162, 135, 157);
       
       .content {
         height: 800px;
         background: @bg;
       }
   
2. JS 文件导入 LESS 文件
       import "./less/app.less"
3. 安装 loader
       npm i less less-loader -D
4. 配置 loader

    module.exports = {
        module: {
            rules: [
                .
                .
                .
      		   // 配置 less 文件处理
                {
                    test: /\.less$/, // 处理less文件
                    use: [
                        'style-loader', // 将 CSS 生成 style 标签插入 HTML 中
                        'css-loader', // 将 CSS 转为 CommonJS 的模块
                        'less-loader' // 将Less编译为CSS
                    ]
                },
            ]
        }
    }	

1. 执行打包命令

    npx webpack

6. 打包 JS

6-1. JS 语法转换

问题：一些浏览器(尤其是IE)对ES6新语法的支持不够(不兼容), 但前端开发基本都在用ES6+的语法

解决：利用babel相关工具包将 ES6 转换为 ES5

Babel 可以将浏览器不能识别的新语法（ES6-11）转换成原来识别的老语法（ES5），浏览器JS兼容性处理。 操作流程：

1. 安装babel相关工具包
       npm install -D babel-loader @babel/core @babel/preset-env
   - @babel/core  		babel 的核心库 (本身并不能完成 ES6 转 ES5)
     @babel/preset-env	babel 的预设工具包，将 ES6 新语法转为 ES5
      babel-loader   		babel 在 webpack 中的 loader 包
   babel 插件包: 每个 ES6 的新语法都有一个对应的 babel 插件包来转换为对应的 ES5 语法 
   babel 预设包: 包含多个常用的 babel 插件包的一个大的集合包 ==> 简化配置

1. 配置 loader

    module.exports = {
        module: {
            rules: [
      		    //配置 babel 的 loader
                {
                    test: /\.js$/,
                    exclude: /node_modules/, // 不进行处理的文件夹
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'], // 指定bebel预设包
          				   plugins: [], // 指定babel插件包
                        }
                    }
                },
              
            ]
        }
    }

1. 设置目标浏览器
   问题：webpack5 打包生成的 JS 代码默认是被包裹在『箭头函数』中， 而IE不支持箭头函数
   解决：在 package.json 配置说明兼容 IE 浏览器  => 打包文件中的箭头函数变为 function 函数
       "browserslist": [
         "> 0.1%",
         "not ie <=8"
       ]
2. 执行打包命令

    npx webpack

6-2. JS 兼容性处理

- 区别ES6的 新语法 与 新API
  - 新语法: 可以转换为ES5的对应语法, 如: const / let / 箭头函数 / 解构等
  - 新API: 没有对应的ES5语法可转换, 如 Promise / Array的新方法 / Map / Set
- @babel/polyfill 包
  - 提供了 ES6 所有新API的实现代码
  - 准确的说是由其依赖的core-js包提供的实现

问题：babel的预设包/插件包并不能处理 ES6 的新 API  ==> IE不支持ES6新API, 会报错

解决：利用polyfill包提供 ES6 新 API的实现 ==> 不支持ES6新API的浏览器也可以兼容了 

Polyfill

1. 安装 polyfill
       npm i @babel/polyfill
2. 入口文件引入 polyfill
       import '@babel/polyfill';
3. 重新打包   
       npx webpack

core-js

问题： 完整引入 polyfill 包会导致打包文件过大

解决： 配置按需打包， 减小打包文件大小  =>  useBuiltIns: 'usage'

1. 修改 babel-loader 的配置
       {
           test: /\.js$/,
               exclude: /node_modules/, 
                   use: {
                       loader: 'babel-loader',
                           options: {
                               //修改 presets 为下面的内容
                               presets: [
                                   [
                                       '@babel/preset-env',
                                       {
                                           useBuiltIns: 'usage', // 只打包使用的ES6新API的实现代码
                                           corejs: { version: 2 } // 指定core-js的版本号为2
                                       }
                                   ]
                               ], 
                           }
                   }
       },
2. 移除入口文件中的 『import  '@babel/polyfill'』
3. 执行打包命令
       npx webpack
       

6-3. JS 代码规范检查

问题：如何保证项目小组多个程序员的JS代码规范且风格一致呢 

解决：利用eslint工具对代码进行统一的代码规范检查

ESLinst 文档：https://eslint.bootcss.com

ESLint能对 JS 语法规范进行检查

ESlint 不能检查 JS 运行时错误，因为并没有执行 JS 代码

1. 安装插件
       npm i eslint eslint-webpack-plugin -D
2. 修改 webpack.config.js 配置文件
       // 导入ESLint插件
       const ESLintPlugin = require('eslint-webpack-plugin');
       
       module.exports = {
           mode: 'development',
           module: {
               .
               .
               .
           },
           
         	// 配置进行ESlint检查的插件
         	plugins: [
               new ESLintPlugin()
           ]
         
       }
   
3. 项目根目录下创建 eslint 配置文件 『.eslintrc.js』
       module.exports = {
         extends: "eslint:recommended", // 使用eslint推荐的默认规则
         rules: {
           // eslint检查的规则  0 忽略 1 警告 2 错误
           "no-console": 0, // 不检查console
           eqeqeq: 1, // 要求使用 === 
           "no-alert": 0, // 不能使用alert
         },
         parserOptions: {
           ecmaVersion: 6, // 支持es6
           sourceType: "module", // 使用es6模块化
         },
         env: {
           // 环境 用来指定识别哪个环境的全局变量
           browser: true, // 支持浏览器中的全局变量
           node: true, // 支持node中的全局变量
           es6: true, // 支持ES6中的全局变量
         },
         globals: {
           // 声明使用的全局变量, 这样即使没有定义也不会报错了
           axios: "readonly", // $ 不允许重写变量
         },
       };
4. 执行打包命令
       npx webpack
       

7. 打包 HTML

问题： 在HTML中手动引入打包文件比较麻烦，且没有压缩处理

解决： 使用html-webpack-plugin打包HTML => 自动引入打包文件，压缩HTML

1. 删除HTML中引入的JS打包文件
2. 安装插件
       npm i html-webpack-plugin -D
3. 修改 webpack.config.js 配置文件
       // 1. 引入插件
       const HtmlWebpackPlugin = require('html-webpack-plugin');
       
       module.exports = {
           plugins: [
             
             
              	// 2. 配置打包HTML的插件
               new HtmlWebpackPlugin({
                   template: "./public/index.html",// 指定html模板文件。
                   inject: "body",// 将打包生成的JS文件放置在body尾部
                   hash: true,// 在引入JS时增加hash后缀字符串,去除缓存。
                   minify: {
                       removeAttributeQuotes: true,// 移除属性中的双引号
                       removeComments: true,// 移除注释
                       collapseWhitespace: true,// 去除空格与换行
                   }
               })
             
           ]
       }
4. 执行打包命令
       npx webpack  # 打包产生的页面自动引入js打包文件

8. 打包图片

8-1. 打包 CSS和JS 中的图片

问题： 在CSS或JS中我们都有可能引入图片, 如何打包这些图片文件呢?

解决： 我们可以用内置的资源加载器来处理



参考文档：https://webpack.docschina.org/guides/asset-modules/

1. 在CSS中引入图片
       <div class="react"></div>
       <div class="vue"></div>
   拷贝图片react.png vue.png到src/img文件夹下
       .react {
         width: 200px;
         height: 200px;
         float: left;
         margin-right: 20px;
         background: url('../images/react.png');
         background-size: cover;
       }
       .vue {
         width: 200px;
         height: 200px;
         float: left;
         background: url('../images/vue.png');
         background-size: cover;
       }
   
2. 修改 webpack.config.js
       module.exports = {
           mode: 'development',
           module: {
               rules: [
              
               	// 处理图片
                 {
                     test: /\.(jpg|png|gif)$/,
                     type: "asset",
                     // 解析器
                     parser: {
                       // 指定进行图片base64编码最大文件大小
                       dataUrlCondition: {
                         maxSize: 5 * 1024, // 5kb    默认8k
                       }
                     },
                     // 打包生成的文件
                     generator: {
                       filename: 'images/[hash:8][ext]',
                     },
                  },
                 
               ]
           }
       }
3. 重新打包
       npx webpack
       

图片base64编码：对要引入的小图片转换为特定字符串，显示时还是为原图片

好处：减少HTTP请求，加快图片显示

限制：只合适小图片，如果是大图也做base64处理，会导致css/html文件过大，不利用页面显示

8-2. 打包 HTML 中的图片

问题：内置的资源打包器不能打包处理html中 <img> 引入的图片

解决：利用html-loader打包html中引入的图片

1. HTML 结构中引入图片
   拷贝图片 angular.png到public/img目录下
       <img src="./img/angular.png" alt="">
2. 安装 loader
       npm i html-loader -D
3. 配置 loader
       module.exports = {
           module: {
               rules: [
       
       		 // 配置 html 的 loader
                   {
                       test: /\.(html)$/,
                       use: {
                           loader: 'html-loader'
                       }
                   }
                 
               ]
           }
       }
4. 执行打包
       npx webpack
       

需要移除 public/index.html 中的 script 标签, 否则会再次导入 JS, 造成打包失败

8-3. 打包字体图标

问题：项目中有可能引入字体图片文件来显示小图标, 如何打包字体图标呢?

解决：我们也可以用内置的资源加载器来处理

首先先下载一个阿里图标库中的项目，然后按照如下流程操作：

1. 将字体文件复制到 src/fonts 目录下
   iconfont.ttf / iconfont.woff / iconfont.woff2
2. 复制 CSS 代码到样式文件中，这里可以是 CSS 文件，也可以是 LESS 文件
       @font-face {
         font-family: 'iconfont';
         src: url('../fonts/iconfont.woff2?t=1652078424644') format('woff2'),
               url('../fonts/iconfont.woff?t=1652078424644') format('woff'),
               url('../fonts/iconfont.ttf?t=1652078424644') format('truetype');
       }
       
       .iconfont {
         font-family: "iconfont" !important;
         font-size: 16px;
         font-style: normal;
         -webkit-font-smoothing: antialiased;
         -moz-osx-font-smoothing: grayscale;
       }
3. HTML 结构中创建对应的 span 标签   
       <span class="iconfont">&#xe745;</span>
4. 修改 webpack.config.js 配置文件
       module.exports = {
           mode: 'development',
           module: {
               rules: [
       
         			// 打包字体图标
                   {
                     test: /\.(eot|svg|woff|woff2|ttf)$/,  
                     type: 'asset',
                     // 解析器
                     parser: {
                       // 指定进行base64编码最大文件大小
                       dataUrlCondition: {
                         maxSize: 5 * 1024, // 5kb
                       }
                     },
                     generator: {
                       filename: 'fonts/[hash:8][ext]',
                     },
                   },
                 
               ]
           },
       }
5. 重新打包
       npx webpack
       

9. 自动打包运行

问题：修改任何代码，都要重新打包 ==》 麻烦

解决：利用webpack-dev-server(webpack开发服务器)来修改后重新自动打包运行

1. 安装 webpack-dev-server
       npm i webpack-dev-server -D
2. 修改 webpack.config.js 配置
       module.exports = {
       
           output: {
               path: resolve(__dirname, 'build'),
               filename: 'js/bundle.js',
               clean: true,
             
               // 设置引入打包文件的基础路径，默认是相对路径
               publicPath: '/'
             
           },
           module: {},
           plugins: [],
       
           // 配置开发服务
           devServer:{
               port:3000,// 设置端口号
               open:true,// 自动在浏览器中打开页面
           }
         
       }
3. 运行启动命令
       npx webpack-dev-server # 会自动启动浏览查看效果, 修改代码后会自动刷新

10. 开启sourceMap调试

问题：代码运行报错， 不能定位到哪个源文件哪行有问题 ，不方便调试

解决：利用devtool配置生成sourceMap，出错提示哪个源文件哪一行的问题

sourceMap文件: 

		记录打包文件与源码文件的映射关系文件,  打包文件中一条语句对应的是哪个文件哪一行

1. 编写一个错误的代码: src/js/m1.js
       export const sum = (x, y) => {
         console.log2('sum')
         return x + y
       }
   此时的错误提示不太友好, 没有指出是m1.js中第2行出错了
2. 修改webpack配置
       module.exports = {
           plugins: [],
           devServer:{},
       
           // 开启sourceMap调试
         	// devtool: 'source-map', // 生成单独的sourceMap文件 ==> 慢
       	devtool: 'cheap-module-source-map', // 只生成内联的sourceMap ==> 快
         	// 生产环境打包不用生成sourceMap， 只有开发环境需要
         
       }
3. 重新开发服务器运行
       npx webpack-dev-server
       npx webpack
   此时的错误信息输出就是: m1.js中第2行出错了

11. 拆分webpack配置

问题：开发环境与生产环境对webpack打包的要求不太一样， 一个配置文件不好搞定

解决：针对开发环境与生产环境，编写不同的webpack配置文件

1. 根目录下创建文件夹 config，将 webpack.config.js 复制两份
   - ./config/webpack.dev.js
   - ./config/webpack.prod.js
2. 修改 webpack.prod.js
       module.exports = {
       
           // 1. 设置模式为生产模式
           mode: 'production',
         	output: {
             // 4. 修改打包输出的根目录
             path: resolve(__dirname, '../build')
           },
         	// 2. 删除 devServer 设置
         	// 3. 删除 devtool 设置
       }
3. 修改 package.json，配置打包运行的npm命令
       "scripts": {
       		"start": "webpack-dev-server --config ./config/webpack.dev.js",
       		"build": "webpack --config ./config/webpack.prod.js"
       }
4. 运行命令
       开发环境运行：npm run start
       
       生产环境打包：npm run build
       全局安装小服务器：npm i -g serve
       运行项目：serve build
   

12. CSS 进一步处理

12-1. CSS单独打包

问题：默认情况下CSS代码是被打包到JS文件中的， 不利于后面的生产环境打包的优化处理

解决：利用 mini-css-extract-plugin将CSS从JS中抽取出来，单独打包

1. 安装工具包
       npm i mini-css-extract-plugin -D
2. 修改 webpack.prod.js
       // 1. 引入插件
       const MiniCssExtractPlugin = require("mini-css-extract-plugin");
       
       module.exports = {
           
           module: {
               rules: [
                 
               	// 2. 修改loader，将之前的style-loader换为MiniCssExtractPlugin.loader
                   {
                       test: /\.css$/,
                       use: [
                           MiniCssExtractPlugin.loader,
                         	// "style-loader" // 运行时将js中css添加到页面的<style>
                           "css-loader",
                       ]
                   },
                   {
                       test: /\.less$/,
                       use: [
                           MiniCssExtractPlugin.loader,
                         	// "style-loader"
                           'css-loader',
                           'less-loader'
                       ]
                   },
                 
               ]
           },
           plugins: [
             
               // 3. 配置插件
               new MiniCssExtractPlugin({					
                   filename: "css/[hash:8].css",
               }),
               
           ]
       }
3. 重新生产打包并运行
       npm run build # 在build/css目录下单独生成了css文件

12-2. CSS 兼容性处理

C3样式厂商前缀: 为了让我们使用的C3样式有更好的浏览器兼容性, 我们需要指定不同的厂商前缀

- -moz- 代表firefox浏览器私有属性
- -ms- 代表ie浏览器私有属性
- -webkit- 代表safari、chrome私有属性
- -o- 代表Opera

问题:  打包CSS时, 默认没有给C3样式添加厂商前缀 

解决:  利用 postcss和 autoprefixer在打包css时自动添加C3样式厂商前缀, 兼容不同浏览器

1. 安装相关工具包
       npm i postcss-loader autoprefixer -D
2. 修改 webpack.prod.js 中的 css 和 less 的 loader 设置
       module.exports = {
           module: {
               rules: [
                 
               	// 配置 postcss-loader
                   {
                       test: /\.css$/,
                       use: [
                           MiniCssExtractPlugin.loader,
                           "css-loader",
                           'postcss-loader', // 添加在css-loader下面
                       ]
                   },
                   {
                       test: /\.less$/,
                       use: [
                           MiniCssExtractPlugin.loader,
                           'css-loader',
                           'postcss-loader', // 添加在css-loader下面
                           'less-loader'
                       ]
                   },
       
               ]
           },
          
       }
   
3. 项目根目录下创建 postcss.config.js
       module.exports = {
           plugins: [ // 在postcss插件中指定autoprefixer
               require('autoprefixer')
           ]
       }
4. 修改 package.json，增加 browserslist 属性
       "browserslist": [
         "> 0.1%",
         "not ie <=8"
       ]
5. 重新打包
       npm run build

12-3. CSS 压缩

问题: 单独打包的CSS默认是没有压缩的, 生产环境下需要对CSS进行压缩减小打包文件

解决: 使用css-minimizer-webpack-plugin 插件压缩 CSS 代码

1. 安装插件
       npm i css-minimizer-webpack-plugin -D
2. 修改配置文件
       // 1. 引入插件
       const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
       
       module.exports = {
         
           // 2. 在优化配置中指定插件来压缩CSS
           optimization: {
               minimizer: [new CssMinimizerPlugin()],
           },
         
       }
3. 重新打包
       npm run build

13. JS 进一步处理

13-1. JS 压缩

问题: 一旦配置了optimization来压缩CSS后, 发现JS打包文件就没有压缩了, JS同样是需要压缩的

解决: 使用webpack5内置插件terser-webpack-plugin 压缩 JS 代码

1. 修改配置文件 webpack.prod.js
       // 1. 引入插件
       const TerserPlugin = require("terser-webpack-plugin");
       
       module.exports = {
         
           // 2. 在优化配置项中指定插件压缩JS
           optimization: {
               minimizer: [
         					...
                   new TerserPlugin()
               ],
           },
       }
2. 重新打包
       npm run build
       

13-2. JS文件名hash化

- 理解『文件名 hash 化』:
  - 对一个文件内容进行md5加密可以产生一个对应的md5值, md5值随着内容变化而变化
  - 将文件内容的md5值作为文件名的组成部分, 称之为文件名hash化
- 为什么要做文件名hash化处理?
  - 浏览器会对请求得到的某个资源文件进行缓存, 如果下次再请求同一个地址的资源时就会使用缓存
  - 再次打包, 
    - 打包生成的文件内容不变,那其hash文件名也不变化,对应的url就不会变化, 浏览器就会使用缓存
    - 如果打包文件内容变化了, 文件名变化了, 对应的url也会变化, 浏览器就不会使用缓存
  - 这样做了文件名hash化处理后, 可以合理利用浏览器缓存 

问题: 图片和CSS都已经做了文件名hash化处理, 但JS还没有做此处理

解决: 修改配置对JS文件名也做hash化处理

1. 修改配置文件 webpack.prod.js
       output: {
       	filename: 'js/bundle-[contenthash:8].js'
           ...
       }
2. 重新打包
       npm run build
       

附录

browserslist

browserslist 目标浏览器配置表，可以针对目标浏览器进行编译处理，避免不必要的兼容代码

browserslist 配置的方法有两种，一种是修改 『package.json』 配置，一种创建 『.browserslistrc』 文件



1. package.json 形式

    {
    	.
    	.
    	.
    	"browserslist": [
            ">0.2%",
            "not dead",
            "not op_mini all"
        ]
    }

1. 项目根目录下创建『.browserslistrc』 文件

    > 1%
    last 2 versions

配置规则介绍

  规则                    	介绍                              
  > 1%                  	全球超过1%人使用的浏览器                   
  > 5% in US            	指定国家使用率覆盖                       
  last 2 versions       	所有浏览器兼容到最后两个版本根据CanIUse.com追踪的版本
  Firefox > 20          	指定浏览器的版本范围                      
  not ie <=8            	排除 ie8 及以下                      
  Firefox 12.1          	指定浏览器的兼容到指定版本                   
  since 2013            	2013年之后发布的所有版本                  
  not dead with > 0.2%  	仍然还在使用且使用率大于 0.2%               
  last 2 Chrome versions	最新的两个 Chrome 配置                 
  cover 99.5%           	99.5% 的浏览器都是目标                  

https://caniuse.com/ 查看兼容性的网站


