const express = require('express');
const ReactDOMServer = require('react-dom/server');
const fs = require('fs');
const path = require('path');
const app = express();


const ServerApp = require('../../dist/ServerApp.bundle').default;

const AppString = ReactDOMServer.renderToString(ServerApp);
console.log(AppString,'看看html')

const htmlTemplate = fs.readFileSync(path.join(__dirname, '../../dist/index.html'), 'utf-8')
console.log(htmlTemplate,'13---')
// 现在把AppString插入到htmlTemplate里面去
const newHtml = htmlTemplate.replace('<!-- app -->', AppString)

// 此时dist下的indexhtml是内联bundlejs的，res出去默认是内联不到的，需要讲dist开个静态服务才可以
// 指定静态目录前缀为/public
app.use('/public', express.static(path.join(__dirname, '../../dist')))

// 路由识别
app.get('/', (req, res) => {
  res.send(newHtml);
})




const port = process.env.PORT || 5003
// 现在的目的就是 我们在浏览器访问这个服务端启的端口，能够返回client里的对应路由渲染好数据的html给你
app.listen(port, ()=>console.log(`server on port ${port}`));