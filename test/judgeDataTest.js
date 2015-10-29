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

    /** Posts scores into table **/
    it('should insert score list ',function(done){
      var score = {  entrant_id: '1',
                      judge_id: '1',
                      criteria_id: '1',
                      points: '3.5',
                      feedback: 'awesome'
                    }
      judgeDataService
        .scoreStartup(score)
        .done(function(entrants){
            done();
        });
        after(function(done){
          connection.query("SELECT * from scores", function(err, scores){
            assert.equal(1, scores.length);
          });
          connection.query("delete from scores where criteria_id = ?", score.criteria_id, function(err){
            if(err) console.log(err);
          });
          connection.query("SELECT * from scores", function(err, scores){
            assert.equal(0, scores.length);
            done();
          });


        })
    });
});
