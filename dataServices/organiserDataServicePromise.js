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

  this.insertCompetition = function (data, cb) {
      return queryExecutor.executeQuery('INSERT INTO competition SET ?', [data], cb );
  };
a
  this.getCompInfo = function (data, cb) {
      return queryExecutor.executeQuery('SELECT id, name, image_url, entrants, organizer, description, location, DATE_FORMAT(date, "%d/%l/%Y") as date, start_time, end_time FROM competition WHERE id = ?', data, cb );
  };
  this.getEntrantInfo = function (data, cb) {
      return queryExecutor.executeQuery('SELECT * FROM startup, entrants WHERE startup.id = entrants.startup_id AND entrants.competition_id = ?', data, cb );
  };

  this.deleteComp = function (data, cb) {
      return queryExecutor.executeQuery('DELETE FROM competition WHERE id = ?', data, cb );
  };

  this.getCompId = function(data, cb){
    return queryExecutor.executeQuery('SELECT competition_id FROM entrants WHERE startup_id = ?', data, cb);
  };

  this.deleteStartup = function(data, cb){
    return queryExecutor.executeQuery('DELETE FROM startup WHERE id = ?', data, cb);
  };

  this.deleteEntrant = function(data, cb){
    return queryExecutor.executeQuery('DELETE FROM entrants WHERE startup_id = ?',data, cb)
  };
}
