var OrganiserDataService = require('../dataServices/organiserDataServicePromise');
var assert = require("assert");
var Promise = require("bluebird");

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
