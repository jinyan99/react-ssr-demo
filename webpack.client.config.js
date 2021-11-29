const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.join(__dirname, 'src/client/index.js'),
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/dist`, // path必须写成绝对路径
    publicPath: '/public/'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: path.join(__dirname, 'src/client/index.html')
    })
  ],  
  devServer: {// 实现热更新
    hot: true,// 就不用每次执行webpack-dev-server命令时加--hot了
    port: '3003',
    // overlay: true,// 报错信息会显示在页面上
  }
}