var mysql = require('promise-mysql');
//var config = require('../config/db.json')
//var config = require('../config/'+process.argv[3]+'.json')
require('dotenv').config();
console.log(process.env.SERVER_CONFIG)
var config = require(process.env.SERVER_CONFIG+'db.json')
console.log(process.env.SERVER_CONFIG)

pool = mysql.createPool(config);
async function getSqlConnection() {
  return pool.then(p => {
    return p.getConnection().disposer(function(connection) {
      console.log("connected")
      //releaseConnection(connection);
      connection.release()
    });
  })
}

module.exports = getSqlConnection;
