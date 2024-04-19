var Promise= require('bluebird');
var getSqlConnection = require('./mySql-config');

var db =  {
  getResultSet:function($model) {
    $model.statement.replace(/\\/g, "");
    console.log($model.statement)
    return new Promise(function(resolve,reject) {
      Promise.using(getSqlConnection(),function(connection) {
     //   console.log(connection)
       // console.log('got the connection')
        $options ={sql:$model.statement,nestTables: true} //,'nestTables':true}
        return connection.query($options)
      }).then($results =>{
        console.log($model.statement)
        $model.data= $results
        resolve($model)
      }).catch(function(error) {
        console.log('i am getting an error',$model.statement)
        
        reject({"error":error});
      });
    });
  },
  getResultSet2:function($mdl) {
    return new Promise(function(resolve,reject) {
      $mdl.statement.replace(/\\/g, "");
      console.log($mdl.statement)
      Promise.using(getSqlConnection(),function(connection) {
        $options ={sql:$mdl.statement,nestTables: true} //,'nestTables':true}
        connection.query($options).then(function($results) {
          $mdl.data=$results;
      //   console.log($results)
          resolve($mdl);
        }).catch(function(error) {
            console.log(' i am getting an error')
            reject({"error":error.sqlMessage});
        });
      }).catch(function(error) {
          console.log($mdl.statement)
          console.log(' i am getting an error')
          reject(error);
      });
    });
  },
  insert:function($model) {
    $model.statement.replace(/\\/g, "");
    return new Promise(function(resolve,reject) {
      Promise.using(getSqlConnection(),function(connection) {
        //console.log($model.statement)
        //console.log('Values',$model.options.values)
        connection.query($model.statement,$model.options.values)
          .then(function($results) {
           // console.log($results)
            $model.results = $model.options.values;
            $model.options.data.id = $results.insertId;
            $model.results.id = $results.insertId;
            resolve($model);
        })
      }).catch(function(error) {
          reject(error);
      });
    })
  },
  update:function($model) {
    return new Promise(function(resolve,reject) {
      //console.log('Statement *******')
      //console.log($model.statement)
      Promise.using(getSqlConnection(),function(connection) {
        //console.log($model.options.values);
        connection.query($model.statement,[$model.options.values] ).then(function($results) {
          $model.results = $model.options.values;
          resolve($results);

        });
      }).catch(function(error) {
        console.log('got update error')
          reject(error);
      });
    });
  },
  delete:function($model) {
    return new Promise(function(resolve,reject) {
      //console.log('Statement *******')
      //console.log($model.statement)
      Promise.using(getSqlConnection(),function(connection) {
        connection.query($model.statement,[ ]).then(function($results) {
          $model.results = $results;//$model.options.values;
          resolve($results);
 
        });
      }).catch(function(error) {
          reject(error);
      });
    });
  }
};

module.exports = db;
