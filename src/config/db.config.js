'use strict';
const mysql = require('mysql');
//local mysql db connection

const dbConn = mysql.createConnection({
  host     : 'us-cdbr-east-03.cleardb.com',
  user     : 'b9a579c066c741',
  password : '74fb8269',
  database : 'heroku_746c5166d3a7b08'
});
setInterval(function () {
  dbConn.query('select * from user');
}, 5000);
dbConn.connect(function(err) {
  if (err) throw err;
  console.log("Database Connected!");
});

module.exports = dbConn;
// for database connection 
//ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'