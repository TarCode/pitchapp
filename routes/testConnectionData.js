var mysql = require('mysql');

module.exports = function () {
  return mysql.createConnection({
          host     : 'localhost',
          user     : 'tarcode',
          password : 'coder123',
          database : 'pitchapp_test'
      });
};
