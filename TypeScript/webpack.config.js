const path = require("path"); //nodejs中的模块作用是拼接路径
//webpack中的所有配置信息都应该写在module.exports中
// 引入html插件
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin} = require('clean-webpack-plugin')
module.exports = {
  // 指定入口文件 entry：入口文件 src下建一个index.ts   值为这个路径
  entry: "./src/index.ts",

  // 指定打包文件所在目录
  output: {
    //指定打包文件的目录
    path: path.resolve(__dirname, "dist"), //通过path把路径拼出来
    filename: "bundle.js", //打包后的文件名
    environment: {
      arrowFunction: false, // 关闭webpack的箭头函数，可选 告诉webpack不使用箭头函数
    },
  },
  mode: "development",
  // 开发模式使用，方便查错误
  devtool: "inline-source-map",
  // 配置服务器 端口
  devServer: {
      port: 8088,
      static:'./public',
  },

  // 用来设置引用模块，可以将这些文件识别为模块
  resolve: {
    extensions: [".ts", ".js"],
  },

  // 配置webpack的loader 打包时要使用的模块
  module: {
    rules: [ //指定要加载的规则
      {
        test: /.ts$/, //test指定的是规则生效的文件 
       
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
                    //使用corejs的方式 "usage"  表示按需加载
                    "useBuiltIns": "usage"
                  }

                ]
              ]
            }
          },
          // 'babel-loader',
          'ts-loader'
        ],
        exclude: /node_modules/, //要排除的文件 默认的不用改
      },
    ],
  },

  // 配置webpack的插件
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};