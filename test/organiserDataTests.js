var OrganiserDataService = require('../dataServices/organiserDataServicePromise');
var assert = require("assert");
var Connection = require('../routes/testConnectionData');
var Promise = require("bluebird");

var connection =  new Connection();

connection.connect();

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
