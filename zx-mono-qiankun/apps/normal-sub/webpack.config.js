const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const name = 'normal-sub22';

module.exports = {
  mode: 'production', // 控制开发还是生产模式
  entry: './index.js',
  output: {
    path: resolve(__dirname, 'build'),
    filename: './bundle.js',
    publicPath: '/',
    // jsonpFunction: 'abdddddd',
    chunkLoadingGlobal: 'myCustomFunc',
    libraryTarget: 'umd',
    globalObject: 'window',
    clean: true // 代替  CleanWebpackPlugin 插件
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的HTML，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      // 复制 './src/index.html' 文件，并自动引入打包输出的所有资源（JS/CSS）
      template: './index.html'
    })
  ],
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    port: 8884, // 端口号
    hot: true, // 启用 hmr hot-module-replacement-plugin webpack 内置插件
    historyApiFallback: true,
    open: false //  是否自动打开浏览器
  }
};
