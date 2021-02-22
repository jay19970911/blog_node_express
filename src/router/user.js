const express = require('express')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const uuid = require('uuid/v1')

var secretkey = 'secretkey'

const router = express.Router()

const connection = require('../mysql');

// 注册
router.get('/register', function (req, res) {
  let { username, password } = req.query
  let id = uuid().replace(/\-/g, '')
  let md5 = crypto.createHash('md5')
  md5.update(password)
  password = md5.digest('hex')
  var sql = `insert into user (id,username,password) values ('${id}','${username}','${password}')`
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err.message, 'err')
    }
    res.json({
      code: '200',
      message: '注册成功',
    })
  })
})

// 登录接口
router.post('/login', function (req, res) {
  let params = req.body
  const user = {
    username: params.username,
    password: params.password
  }
  var sql = `select * from user where username = '${user.username}' and password = '${user.password}'`
  connection.query(sql, function (err, result) {
    if (err) throw err
    var token = jwt.sign({ username: user.username }, secretkey, { expiresIn: 60 * 60 })
    res.json({
      code: '200',
      message: '登录成功',
      token: token
    })
  })
})


router.get('/', function (req, res) {
  res.json({
    username: '123456'
  })
})

module.exports = router