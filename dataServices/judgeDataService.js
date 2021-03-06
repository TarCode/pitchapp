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
  this.getEntrant = function (data, cb) {
      insertData('SELECT * FROM startup, entrants WHERE startup.id = entrants.startup_id AND entrants.id = ?', data, cb );
  };

  this.getCriteria = function(data,cb){
  		insertData('SELECT * FROM criteria WHERE competition_id = ?',data,cb);
  };

  this.scoreStartup = function(data,cb){
      insertData('insert into scores set ?',data,cb);
  };
  this.giveScoreFeedback = function(data,cb){
    console.log('DATA:'+JSON.stringify(data))
     insertData('update scores set feedback = ? where id = ? ',data,cb)
  }
  this.entrantJudgedStatus = function(data,cb){
      insertData('update entrants set judged = ? where id = ? ',data,cb)
  }
//scores table gets startup id instead of entrants id - needs to be fixed
  this.getTotals = function(data,cb){
      insertData('SELECT SUM( points ) AS points, startup.name FROM startup, scores, entrants WHERE scores.entrant_id = entrants.id AND entrants.startup_id = startup.id GROUP BY entrant_id ORDER BY points DESC ',data,cb);
  };

  this.getEntrantTotal = function(data,cb){
      insertData('SELECT entrants.id, startup.name ,criteria.name as criteria,scores.id as score_id, scores.feedback, scores.points FROM entrants, scores,startup ,criteria WHERE entrants.id = scores.entrant_id and entrants.startup_id = startup.id and criteria.id = scores.criteria_id AND scores.entrant_id =?',data,cb);
  };

}
