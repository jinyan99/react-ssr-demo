const path = require('path');

module.exports = {
  target: 'node',// 告诉这个打包出来是给node用的
  entry: path.join(__dirname, 'src/client/ServerApp.js'),
  output: {
    filename: 'ServerApp.bundle.js',
    path: `${__dirname}/dist`, // path必须写成绝对路径
    libraryTarget: 'commonjs2',// 表明打包出来的文件是给node环境用的
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
}