var mysqlDb = require('./mySql-db.js');
var dbType='mysql'
var db = {
  find:async function($options)
    {

        if($options.dbType) { dbType=$options.dbType} else { dbType='mysql'}
        switch(dbType) {
            case  'oracle':
  //              return await oracleDb.getResultSet($options)
                break;
            case 'mysql':
                return await mysqlDb.getResultSet($options);
                break;
            case 'pgsql':
                return await pgsqlDb.getResultSet($options);
                break;
        }
    },
    insert:async function($options,$dbType)
      {
        if($options.dbType) { dbType=$options.dbType} else { dbType='mysql'}
          switch(dbType) {
              case  'oracle':
    //              return await oracleDb.getResultSet($options)
                  break;
              case 'mysql':
                  return await mysqlDb.insert($options);
                  break;
          }
      },
      delete:async function($options,$dbType)
      {
        if($options.dbType) { dbType=$options.dbType} else { dbType='mysql'}
          switch(dbType) {
              case 'mysql':
                return await mysqlDb.delete($options)
          }
      },
      update:async function($options,$dbType)
      {
        if($options.dbType) { dbType=$options.dbType} else { dbType='mysql'}
          switch(dbType) {
              case 'mysql':
                return await mysqlDb.update($options)
          }
      },
     
} ;
module.exports = db;
