var mysql = require('mysql');

module.exports = function () {
  return mysql.createConnection({
    host: " 127.0.0.1",
    database: "pitchapp_test",
    username: "root",
    encoding: "utf8"
      });
};
