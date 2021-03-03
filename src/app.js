const express = require('express')
const app = express()
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const userRouter = require('./router/user');
const blogRouter = require('./router/blog');
const projectRouter = require('./router/project');
const homeRouter = require('./router/home');

var secretkey = 'secretkey'
const port = 3010

app.use(bodyParser.json());// 添加json解析
app.use(bodyParser.urlencoded({ extended: false }));

// 可跨域 ,编码格式
// app.all('*', function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');//的允许所有域名的端口请求（跨域解决）
//   res.header('Access-Control-Allow-Headers', 'x-requested-with, Content-Type');
//   res.header('Access-Control-Allow-Methods', '*');
//   res.header('Content-Type', 'application/json;charset=utf-8');
//   next();
// })

// 添加token验证
app.use(function (req, res, next) {
  if (req.url != '/api/user/login' && req.url != '/api/user/register') {
    let token = req.headers.authorization
    token = token ? token.split(" ")[1] : ''
    jwt.verify(token, secretkey, function (err, result) {
      if (err) {
        throw new Error('token已过期，请重新登录')
      } else {
        next()
      }
    })
  } else {
    next()
  }
})


// 抛出接口
app.use('/api/user', userRouter);
app.use('/api/blog', blogRouter);
app.use('/api/project', projectRouter)
app.use('/api/home', homeRouter)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})