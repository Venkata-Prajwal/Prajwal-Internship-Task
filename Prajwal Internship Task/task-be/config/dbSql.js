var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user:"root",
  password:"Re320#Re320"
});


module.exports={connection,mysql}