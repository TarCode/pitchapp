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

  this.getAllCompetitions = function () {
     return queryExecutor.executeQuery('SELECT id, name, image_url, entrants, organizer, description, location, DATE_FORMAT(date, "%d/%l/%Y") as date, start_time, end_time  FROM competition');
  };
}
