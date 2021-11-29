
# react-ssr 简易版实践

> 待参考 [github项目](https://github.com/yjdjiayou/react-ssr-demo)
> [参考视频](https://www.bilibili.com/video/BV1Ab411H75B)

## 使用说明

### 安装

* 使用 `npm install`
* 注意：使用 `cnpm install` 安装时不会读取 package.lock.json

### 启动

* 先`npm run build`
* 再执行`npm start`开启后台服务(5003端口)
* 访问5003端口 即返回服务端渲染的首屏html页面

## SSR实践

网页应用一般分两种，一种是spa单页面应用，另一种是mpa多页面应用，今天就主要讲和ssr强相关的mpa多页面应用吧

### MPA

#### 优点

* SEO好，每个页面都有对应的head
* 每个页面都是被服务器渲染出来的，稳定性强
* 浏览器可以缓存一部分css，js还有image图片等来提高页面渲染速度、
* 服务器可以利用cdn进行缓存，提高页面载入速度

#### 缺点

- 我们的每一个跳转都需要刷新浏览器页面都会空白一下，UI/UX体验很差，每个页面都会发起服务器请求，服务器再计算出完整的html给你
- 对服务器来说，服务器压力比较大，风险更高
- 如果所有叶面都放在服务器渲染的话，服务器一旦崩了，就风险高
- 交互性差，每次点击一个链接都是去个新页面，无法在当前一个页面里交互

### 准备

- 安装`npm i webpack webpack-cli webpack-dev-server -D` 用webpack打包必须要用到的3个包
- 安装`npm i babel-loader @babel/core @babel/preset-env @babel/preset-react -D`后面这两个东西都是为babel-loader服务的，让babelloader转化js的时候预置这两个插件
- 安装`npm i react react-dom`

### 客户端步骤

- 可以先尝试直接npm webpack 命令运行会默认执行webpack.config.js文件构建出dist目录

- 服务端渲染都是需要两个核心目录一个server文件夹和一个client文件夹。我们server是要渲染client内容的首屏，

- **devsever局部更新**：使用webpack-dev-server热加载时，每次更新都是会自动刷新下浏览器，还不是完全的只热更新部分节点内容，这时候需要安装`npm i react-hot-loader -D`.
  - 如果devserver启动报错，则有可能node版本太低了升级到16版本
  - 安装react-hot-loader后使用步骤
    1. 先在babelrc文件中使用下他的对应babel插件
    2. 在App文件中引入hot高阶组件把入口组件包装一下即可
  - 安装完后是老的使用方式速度会慢 下面按照文档，装他新api插件
    1. `npm i react-dom@npm:@hot-loader/react-dom`即可原来的还是不要动
- 现在客户端自动化打包渲染就写完了，并且支持了热更新

### 服务端步骤

> 见server/server.js文件 我们服务端想让他渲染客户端项目的第一屏
> server文件夹目的就是 我们在浏览器访问这个服务端启的端口，能够返回client里的对应路由渲染好数据的html给响应请求

- 当服务端渲染html时，想带上bundle.js必须以dist下的html为html模版返回才行
- 以dist下html为模版必须开个静态服务，否则内联不到bunldejs
- 当以dist目录开静态服务后，当页面访问根路由，会不经过app.get方法，直接走进静态资源服务器了（就是被覆盖了），这时候应该静态服务加public前缀。
  - 对应的dist/indexhtml里的内联bundlejs也必须是指定公共路径前缀为public了，这时候应该去clientwebpack打包配置文件中配置outputpublicPath值