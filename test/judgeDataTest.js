var JudgeDataService = require('../dataServices/judgeDataServicePromise');
var assert = require("assert");
var mysql = require("mysql");
var Promise = require("bluebird");

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER || 'root',
  password : "",
  database : 'pitchapp_test'
});
/*var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER || 'tarcode',
  password : "coder123",
  database : 'pitchapp_test'
});
*/


var judgeDataService= new JudgeDataService(connection);

describe('Judge Data Service', function(){

    /** judges comp list test **/
    it('should find all competitions associated with current judge', function (done) {
      judgeDataService
        .getComps()
        .done(function(comps){
            assert.equal(1, comps.length);
            done();
        });
    });


     /** Entrants test **/
    it('should get enrants associated with judge\'s competition ', function (done) {
      judgeDataService
        .getCompEntrants(1)
        .done(function(entrants){
            assert.equal(2, entrants.length);
            done();
        });
    });


     /** Get entrants for judging **/
    it('should return entrant for judging', function (done) {
      judgeDataService
        .getEntrants(1)
        .done(function(entrants){
            assert.equal(1, entrants.length);
            done();
        });

    });


    /** Gets judging criteria **/
    it('should get list of judging criteria ',function(done){
      judgeDataService
        .getCriteria(1)
        .done(function(entrants){
            assert.equal(7, entrants.length);
            done();
        });
});
});
