var Promise = require("bluebird");

function QueryExecutor(connection) {
    this.connection = connection;

    this.executeQuery = function(query, data){
        data = data || [];
        return new Promise(function(accept, reject){
            connection.query( query, data, function(err, results){
              if (err){
                return reject(err)
              }
              accept(results);
            });

        })
    };
}

module.exports = function(connection){

    
    var queryExecutor = new QueryExecutor(connection);
    
    this.getStartups = function(data,cb){
          return queryExecutor.executeQuery('select * from startup',data,cb)
    }

    this.addStartup = function(data,cb){

        return queryExecutor.executeQuery('Insert into startup set ?',data,cb)
    }

    this.deleteStartup = function(data,cb){
         return queryExecutor.executeQuery('delete * from startup where id = ?',data,cb)
    }

    this.getStartupData = function(data,cb){
          return queryExecutor.executeQuery('select * from startup where id = ?',data,cb)
    }      
        
    



}
