var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'blog_infomation',
  timezone: "SYSTEM"
});

connection.connect();

const query = (sql) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, function (err, result) {
      if (err) {
        reject(err)
      } else {
        resolve(result)
      }
    })
  })
}

// const connection = connection
module.exports = {
  query,
  connection
}

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