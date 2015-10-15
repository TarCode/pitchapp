module.exports = function (connection) {

  var getData = function(query, cb){
      connection.query( query, cb);
  };

  var insertData = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getAllCompetitions = function (cb) {
      getData('SELECT id, name, image_url, entrants, organizer, description, location, DATE_FORMAT(date, "%d/%l/%Y") as date, start_time, end_time  FROM competition', cb );
  };

  this.insertCompetition = function (data, cb) {
      insertData('INSERT INTO competition SET ?', data, cb );
  };

  this.getCompInfo = function (data, cb) {
      insertData('SELECT id, name, image_url, entrants, organizer, description, location, DATE_FORMAT(date, "%d/%l/%Y") as date, start_time, end_time FROM competition WHERE id = ?', data, cb );
  };
  this.getEntrantInfo = function (data, cb) {
      insertData('SELECT * FROM startup, entrants WHERE startup.id = entrants.startup_id AND entrants.competition_id = ?', data, cb );
  };

};
