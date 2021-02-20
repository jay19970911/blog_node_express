var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'blog_infomation',
  timezone: "SYSTEM"
});

connection.connect();

module.exports = connection

// var pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   password: '12345678',
//   database: 'blog_infomation'
// });

// function query(sql, callback) {
//   pool.getConnection(function (err, connection) {
//     connection.query(sql, function (err, rows) {
//       callback(err, rows);
//       connection.release();
//     });
//   });
// }

// exports.query = query;