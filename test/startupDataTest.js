var StartupDataService = require('../dataServices/startupDataServicePromise');
var assert = require("assert");
var mysql = require("mysql");
var Promise = require("bluebird");
var deleteKey = require('key-del')

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

var newStartup = {

                         name: 'youtoo',
                         image_url: "/img/em.png",
                         location: "China",
                         industry: 'AI',
                         sector: "B2C",
                         employees: '34',
                         stage: 'Applied',
                         turnover: '10000'

}


var startupDataService= new StartupDataService(connection);

describe('Startup Data Service', function(){

    /** startup list test **/
    it('should find all startups', function (done) {
      startupDataService
        .getStartups()
        .done(function(startups){
            assert.equal(3, startups.length);
            done();
        });
    });


     /** Startup add test **/
    it('should add a startup to table ', function (done) {


      startupDataService
        .addStartup(newStartup)
        .done(function(){
           startupDataService
          .getStartups()
          .done(function(startups){
              assert.equal(4, startups.length);
              done();
          });
        })
    });


     /** single startup data test **/
    it('should return individual startup\'s data', function (done) {

      connection.query("select id from startup where name = ?", newStartup.name, function(err,arr){
             if(err) console.log(err);
             startupDataService
            .getStartupData(arr[0].id)
            .done(function(startup){

                var dbStartUp={}
                for(key in startup[0]){
                    if(key!='id'){
                      dbStartUp[key] = startup[0][key]
                    }
                }

                assert.deepEqual(newStartup, dbStartUp);
                done();
            });
          })

    });


    /** startup delete test **/
    it('should delete a startup ',function(done){

          connection.query("delete from startup where name = ?", newStartup.name, function(err){
             if(err) console.log(err);
          })

          startupDataService
          .getStartups()
          .done(function(competitions){
              assert.equal(3, competitions.length);
              done();
          });


    })

});
