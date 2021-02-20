var express = require('express')
var router = express.Router()

var connection = require('../mysql');

// 项目管理 --- 列表
router.get('/query', function (req, res) {
  var sql = 'select * from project';
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err.message, 'err')
    }
    res.json({
      code: '200',
      list: result,
      message: '操作成功'
    })
  })
})

/**
 *  新增接口
 */
router.post('/add', function (req, res) {
  const params = req.body
  var sql = `insert into project (name,cover,skill,project_tag,sort,status,introduce,tool) values ('${params.name}','${params.cover}','${params.skill}','${params.project_tag}',0,0,'${params.introduce}','${params.tool}');`
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err.message, 'err')
    }
    res.json({
      code: '200',
      message: '创建成功'
    })
  })
})

/**
 *  编辑接口
 */
router.put('/update/:id', function (req, res) {
  const params = req.body
  var sql = `update project set name = '${params.name}',cover='${params.cover}',skill='${params.skill}',tool='${params.tool}',introduce='${params.introduce}' where id='${params.id}'`
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err.message, 'err')
    }
    res.json({
      code: '200',
      message: '编辑成功'
    })
  })
})

/**
 *  详情接口
 */
router.get('/detail/:id', function (req, res) {
  const id = req.params.id
  var sql = `select * from  project where id = '${id}'`
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.json({
      code: '200',
      message: '查询成功',
      data: result[0]
    })
  })
})

/**
 * 删除列表记录
 */
router.delete('/delete/:id', function (req, res) {
  const id = req.params.id
  var sql = `delete from project where id ='${id}'`
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('err', err.message)
    }
    res.json({
      code: '200',
      message: '删除成功'
    })
  })
})

module.exports = router