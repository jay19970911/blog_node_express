const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const userRouter = require('./router/user');
const blogRouter = require('./router/blog');
const projectRouter = require('./router/project');
const port = 3010

app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({ extended: false }));

// 可跨域 ,编码格式
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');//的允许所有域名的端口请求（跨域解决）
  res.header('Access-Control-Allow-Headers', 'x-requested-with, Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
})

// 抛出接口
app.use('/user', userRouter);
app.use('/blog', blogRouter);
app.use('/project', projectRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})