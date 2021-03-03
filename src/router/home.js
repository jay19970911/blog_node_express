var express = require('express')
var router = express.Router()

var { query } = require('../mysql');

// 首页博客和项目列表数据
router.get('/list', function (req, res) {
  let blog = 'select * from blog'
  let project = 'select * from project'
  Promise.all([
    query(blog),
    query(project)
  ]).then(([blog, project]) => {
    res.json({
      code: '200',
      data: { blog, project },
    })
  })
})

module.exports = router