var express = require('express')
var router = express.Router()

var { connection } = require('../mysql');

const marked = require('../utils/md')

/**
 * 查询列表页
 */
router.get("/query", function (req, res) {
  const { title = '' } = req.query
  let page = req.query.page == undefined ? 1 : req.query.page
  let per_page = req.query.per_page == undefined ? 12 : req.query.per_page
  let startPage = (page - 1) * per_page
  // const sql = `select * from blog limit ?,?`; // 添加分页功能
  // connection.query(sql, [startPage, per_page], function (err, result) {
  const sql = title ? `select * from blog  where title like '%${title}%' limit ${startPage},${per_page}` : `select * from blog limit ${startPage},${per_page}`; // 添加分页和搜索功能
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('err', err.message)
    } else {
      let sqlTotal = 'select count(id) as total from blog'
      connection.query(sqlTotal, function (error, among) {
        if (error) {
          console.log(error);
        } else {
          let total = among[0]['total'] //查询表中的数量
          res.json({
            status: 200,
            message: "success",
            list: result,
            total: total
          })
        }
      })
    }
  })
});


/**
 * 删除列表记录
 */
router.delete('/delete/:id', function (req, res) {
  const id = req.params.id
  var sql = `delete from blog where id ='${id}'`
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

/**
 *  详情接口
 */
router.get('/detail/:id', function (req, res) {
  const id = req.params.id
  var sql = `select * from  blog where id = '${id}'`
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err)
    }
    res.json({
      code: '200',
      message: '查询成功',
      data: {
        ...result[0],
        md: marked(result[0].content)
      }
    })
  })
})

/**
 *  新增接口
 */
router.post('/add', function (req, res) {
  const params = req.body
  var sql = `insert into blog (title,subtitle,cover,date,likes_num,contents_num,views_num,content,cate_name) values ('${params.title}','${params.subtitle}','${params.cover}','${params.date}','${params.likes_num}','${params.contents_num}','${params.views_num}','${params.content}','${params.cate_name}');`
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
  var sql = `update blog set title = '${params.title}',subtitle='${params.subtitle}',cover='${params.cover}',date='${params.date}',likes_num='${params.likes_num}',contents_num='${params.contents_num}',views_num='${params.views_num}',content='${params.content}',cate_name = '${params.cate_name}' where id='${params.id}'`
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

// 分类管理 -- 列表
router.get("/cate/query", function (req, res) {
  let page = req.query.page == undefined ? 1 : req.query.page
  let per_page = req.query.per_page == undefined ? 12 : req.query.per_page
  let startPage = (page - 1) * per_page
  var sql = `select * from blog_cate limit ${startPage},${per_page}`;
  connection.query(sql, function (err, result) {
    if (err) {
      console.log('err', err.message)
    } else {
      let sqlTotal = 'select count(id) as total from blog_cate'
      connection.query(sqlTotal, function (error, among) {
        if (error) {
          console.log(error);
        } else {
          let total = among[0]['total'] //查询表中的数量
          res.json({
            status: 200,
            message: "success",
            list: result,
            total: total
          })
        }
      })
    }
  })
});

// 分类管理 --- 添加
router.post('/cate/add', function (req, res) {
  const params = req.body
  var sql = `insert into blog_cate (cate_name,status) values ('${params.cate_name}',0);`
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

// 分类管理 --编辑
router.put('/cate/update/:id', function (req, res) {
  const params = req.body
  var sql = `update blog_cate set cate_name = '${params.cate_name}' where id='${params.id}'`
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

// 删除
router.delete('/cate/delete/:id', function (req, res) {
  const id = req.params.id
  var sql = `delete from blog_cate where id ='${id}'`
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

// 启用
router.patch('/cate/:id/resume', function (req, res) {
  const params = req.params
  var sql = `update blog_cate set status = 1 where id='${params.id}'`
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err.message, 'err')
    }
    res.json({
      code: '200',
      message: '操作成功'
    })
  })
})

// 禁用
router.patch('/cate/:id/forbid', function (req, res) {
  const params = req.params
  var sql = `update blog_cate set status = 0 where id='${params.id}'`
  connection.query(sql, function (err, result) {
    if (err) {
      console.log(err.message, 'err')
    }
    res.json({
      code: '200',
      message: '操作成功'
    })
  })
})

module.exports = router