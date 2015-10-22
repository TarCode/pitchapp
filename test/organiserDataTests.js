var OrganiserDataService = require('../dataServices/organiserDataServicePromise');
var assert = require("assert");
var Promise = require("bluebird");
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : process.env.MYSQL_USER || 'root',
  password : password,
  database : 'travis_db'
});

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
});
