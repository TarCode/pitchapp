module.exports = function(connection){

  var getData = function(query, cb){
      connection.query( query, cb);
  };

  var insertData = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getComps = function(cb){
      getData('SELECT judges.id, competition.id, competition.name, image_url, entrants, organizer, description, location, DATE_FORMAT( DATE,  "%d/%l/%Y" ) AS DATE, start_time, end_time FROM competition, judges WHERE judges.competition_id = competition.id',cb);
  }
  this.getCompEntrants = function (data, cb) {
      insertData('SELECT * FROM startup, entrants WHERE startup.id = entrants.startup_id AND entrants.competition_id = ?', data, cb );
  };
  this.getEntrants = function (data, cb) {
      insertData('SELECT * FROM startup, entrants, competition WHERE startup.id = entrants.startup_id AND competition.id = entrants.competition_id AND competition.id = ?', data, cb );
  };

  this.getCriteria = function(data,cb){
  		insertData('SELECT * FROM criteria WHERE competition_id = ?',data,cb);
  };

  this.scoreStartup = function(data,cb){
      insertData('insert into scores set ?',data,cb);
  };
//scores table gets startup id instead of entrants id - needs to be fixed
  this.getTotals = function(data,cb){
      insertData('SELECT entrant_id, name, points FROM scores, entrants, startup WHERE scores.entrant_id = entrants.id AND entrants.startup_id = startup.id GROUP BY entrant_id ORDER BY points DESC',data,cb);
  };

}
