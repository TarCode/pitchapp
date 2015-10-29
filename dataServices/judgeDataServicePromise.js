var Promise = require("bluebird");

function QueryExecutor(connection) {
    this.connection = connection;

    this.executeQuery = function(query, data){
        data = data || [];
        return new Promise(function(accept, reject){
            connection.query(query, data, function(err, results){
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

  this.getComps = function(cb){
      return queryExecutor.executeQuery('SELECT judges.id, competition.id, competition.name, image_url, entrants, organizer, description, location, DATE_FORMAT( DATE,  "%d/%l/%Y" ) AS DATE, start_time, end_time FROM competition, judges WHERE judges.competition_id = competition.id',cb);
  }
  this.getCompEntrants = function (data, cb) {
      return queryExecutor.executeQuery('SELECT * FROM startup, entrants WHERE startup.id = entrants.startup_id AND entrants.competition_id = ?', data, cb );
  };
  this.getEntrants = function (data, cb) {
      return queryExecutor.executeQuery('SELECT * FROM startup, entrants WHERE startup.id = entrants.startup_id AND entrants.startup_id = ?', data, cb );
  };

  this.getCriteria = function(data,cb){
  		return queryExecutor.executeQuery('SELECT * FROM criteria WHERE competition_id = ?',data,cb);
  };

  this.scoreStartup = function(data,cb){
    return queryExecutor.executeQuery('INSERT INTO scores SET ?',data,cb);
  };
}
