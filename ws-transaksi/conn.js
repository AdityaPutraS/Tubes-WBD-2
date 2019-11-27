var mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  user: "engima",
  password: "engima",
  database: "ws_transaksi",
  socketPath: '/var/run/mysqld/mysqld.sock'
});

con.connect(function (err){
    if(err) throw err;
});

module.exports = con;