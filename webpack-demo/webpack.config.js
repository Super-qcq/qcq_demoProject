/*
  webpack.config.js   webpack的配置文件
    作用: 指示 webpack 干哪些活（当你运行 webpack 指令时，会加载里面的配置）
    所有构建工具都是基于nodejs平台运行的~模块化默认采用commonjs。
    1、module:moudle对应loader（加载器 ）的配置，主要对指定类型的文件进行操作
     举例：js类型的文件和css文件需要不同的loader来处理。最常用的加载器是eslint-loader和babel-loader。

    2、Plugin: plugins用于扩展webpack的功能，相比着loader更加灵活，不用指定文件类型
	 举例:html-webpack-plugin、commonChunkPlugin和ExtractTextPlugin
*/

/**
 * css兼容性处理
 * C3样式厂商前缀: 为了让我们使用的C3样式有更好的浏览器兼容性, 我们需要指定不同的厂商前缀
    - -moz- 代表firefox浏览器私有属性
    - -ms- 代表ie浏览器私有属性
    - -webkit- 代表safari、chrome私有属性
    - -o- 代表Opera
    问题:  打包CSS时, 默认没有给C3样式添加厂商前缀 
    解决:  利用 postcss和 autoprefixer在打包css时自动添加C3样式厂商前缀, 兼容不同浏览器
 */

/**
 *  CSS单独打包
    问题：默认情况下CSS代码是被打包到JS文件中的， 不利于后面的生产环境打包的优化处理
    解决：利用 mini-css-extract-plugin将CSS从JS中抽取出来，单独打包
 */
const path = require("path"); //nodejs中的模块作用是拼接路径
//  功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
const HTMLWebpackPlugin = require('html-webpack-plugin');
// js压缩
const TerserPlugin = require("terser-webpack-plugin");
// 压缩css
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// 对css单独打包
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
//webpack中的所有配置信息都应该写在module.exports中
module.exports = {
    // 指定入口文件 entry：入口文件 src下建一个index.ts   值为这个路径
    entry: "./src/index.js",
    // 指定打包文件所在目录
    // __dirname：当前配置文件所在的目录绝对路径
    output: {
        //指定打包文件的目录
        path: path.resolve(__dirname, "dist"), // 打包文件所在的根目录
        filename: "bundle.js", //打包后的文件名
        clean: true, // 打包时, 会先自动清空打包文件夹
    },
    // 模式
    // mode: 'production',
    mode: 'development',
     // 配置 插件
    // modules:告诉webpack解析模块是去哪个目录 -->如果不指定会webpack会一层一层往外找,造成不必要的性能浪费
     module: {
        rules: [
              // 配置 css 文件处理
            // {
            //     test: /\.css$/, // 处理css文件。指定规则生效的文件
            //     use: [
            //         "style-loader",		// 将 CSS 生成 style 标签插入 HTML 中
            //         "css-loader"  		// 将 CSS 转为 CommonJS 的模块
            //     ]
            //  },
            //  // 配置 less 文件处理
            //  {
            //     test: /\.less$/, // 处理less文件
            //     use: [
            //         'style-loader', // 将 CSS 生成 style 标签插入 HTML 中
            //         'css-loader', // 将 CSS 转为 CommonJS 的模块
            //         'less-loader' // 将Less编译为CSS
            //     ]
            //  },

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
    
             //配置 babel 的 loader  实现按需打包
             {
                test: /\.js$/,
                exclude: /node_modules/, // 不进行处理的文件夹
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
             // 配置 html 的 loader 去执行打包图片
             {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader'
                }
             },
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
     
     //在 package.json 配置说明兼容 IE 浏览器  => 打包文件中的箭头函数变为 function 函数
    
     
    plugins: [
       	// 配置打包HTML的插件
           new HTMLWebpackPlugin({
            template: "./index.html",// 指定html模板文件。
            inject: "body",// 将打包生成的JS文件放置在body尾部
            hash: true,// 在引入JS时增加hash后缀字符串,去除缓存。
            minify: {
                removeAttributeQuotes: true,// 移除属性中的双引号
                removeComments: true,// 移除注释
                collapseWhitespace: true,// 去除空格与换行
            }
           }),
           new MiniCssExtractPlugin({					
            filename: "css/[hash:8].css",
        }),
    ],

    // 开发模式使用，方便查错误
    devtool: "inline-source-map",
    // 配置热更新
    devServer: {
        port: 8080,
        static:'./public',
    },

    // 用来设置引用模块，可以将这些文件识别为模块
    resolve: {
    extensions: [".ts", ".js"],
    },
     // 在优化配置项中指定插件压缩JS
     optimization: {
        minimizer: [
             new TerserPlugin(),
             new CssMinimizerPlugin()
         ],
         
    },

    
}

// ts规则
// {
//     test: /.ts$/, //test指定的是规则生效的文件
   
//     use: [
//       // 配置babel
//       {
//         //指定加载器
//         loader: "babel-loader",
//         // 设置babel
//         options: {
//           //设置预定义的环境
//           presets: [
//             [
//               //指定环境的插件
//               "@babel/preset-env",
//               // 配置信息
//               {
//                 // 要兼容的目标浏览器及版本
//                 targets: {
//                   "chrome": "58",
//                   "ie": "11"
//                 },
//                 //指定corejs的版本（根据package.json中的版本，只写整数）
//                 "corejs": "3",
//                 //使用corejs的方式 "usage"  表示按需加载
//                 "useBuiltIns": "usage"
//               }

//             ]
//           ]
//         }
//       },
//       // 'babel-loader',
//       'ts-loader'
//     ],
//     exclude: /node_modules/, //要排除的文件 默认的不用改
//   },



// 1、test:文件名匹配规则,后面参数是一个正则
 
// 2、exclude:排除匹配某个目录下的内容 -->  exclude: /node_modules/ ->排除node_modules下的文件
 
// 3、include:只检查 某个目录下的文件 --> include: resolve(__dirname, 'src') ->只检查 src 下的js文件
 
// 4、loader与use:单个loader使用loader,多个loader用use
 
// 5、enforce:指定该配置的执行顺序:  enforce:'pre'(优先执行) > 默认 > enforce:'post'(延后执行)
 
// 6、options:指定这个loader的配置选项
 
// 7、oneOf: []:里面的配置只会生效一次,即里面有100个配置,当我一个文件进入这里检测,可能第10个配置匹配到了就生效,然后该文件就不会进行下面90次匹配,如果是不放oneOf里面的配置,就会完全执行100次匹配,性能优化使用