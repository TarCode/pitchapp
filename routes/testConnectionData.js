var mysql = require('mysql');

module.exports = function () {
  return mysql.createConnection({
    adapter: "mysql",
    database: "pitchapp_test",
    username: "travis",
    encoding: "utf8"
      });
};
