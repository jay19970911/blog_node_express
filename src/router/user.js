var express = require('express')
var router = express.Router()

// middleware that is specific to this router
// router.use(function timeLog(req, res, next) {
//   console.log(111, '11')
//   next()
// })
// define the home page route
router.get('/', function (req, res) {
  res.json({
    username: '123456'
  })
})

module.exports = router