module.exports = function(connection){

  var getData = function(query, cb){
      connection.query( query, cb);
  };

  var insertData = function(query, data, cb){
      connection.query(query, data, cb);
  };
  
  this.getEntrants = function (data, cb) {
      insertData('SELECT * FROM startup, entrants WHERE startup.id = entrants.startup_id AND entrants.startup_id = ?', data, cb );
  };
  
  this.getCriteria = function(data,cb){
  		insertData('SELECT * FROM criteria WHERE competition_id = ?',data,cb);
  };


}