var OrganiserDataService = require('../dataServices/organiserDataServicePromise');
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
var organiserDataService= new OrganiserDataService(connection);

describe('Organiser Data Service', function(){
    it('should find all competitions', function (done) {
      organiserDataService
        .getAllCompetitions()
        .done(function(competitions){
            assert.equal(2, competitions.length);
            done();
        });
    });

    it('should insert and delete a competition', function (done) {
      var data = {
          name: "test",
          image_url: "/img/",
          organizer: "test",
          entrants: 2,
          description: "test",
          location: "test",
          date: "24/10/1991",
          start_time: "19:00",
          end_time: "21:00"
        }

      organiserDataService
        .insertCompetition(data)
        .done(function(data){
        })
        organiserDataService
        .getAllCompetitions()
        .done(function(competitions){
            assert.equal(3, competitions.length);
            done();
        });
        after(function(done){
          connection.query("delete from competition where organizer = ?", data.organizer, function(err){
            done(err);
          });
          organiserDataService
          .getAllCompetitions()
          .done(function(competitions){
              assert.equal(2, competitions.length);
              done();
          });
        })
    });


});
