module.exports = function(connection){



  var executeQuery = function(query, data, cb){
      connection.query(query, data, cb);
  };

  this.getUsers = function(cb){
      executeQuery('select * from user',cb);
  }
  
}
