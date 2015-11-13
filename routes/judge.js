//var bcrypt = require('bcrypt');
var count = 0;
var user = {};
lock = false;
var startupNum = 0;
module.exports = function(){

  this.showCompList = function(req, res, next){

        req.services(function(err,services){
           var judgeService = services.judgeDataServ;
           judgeService.getComps(function(err, results) {
                 if (err) return next(err);
                 res.render('judgeCompList',  {comp: results});
              });
         })
    };

    this.showCompEntrants = function(req, res, next){

          req.services(function(err,services){
             var judgeService = services.judgeDataServ;
             var data = req.params.competition_id;
             judgeService.getCompEntrants(data, function(err, results) {
                    if (err) return next(err);

                    results.forEach(function(result){
                      if(result.judged==1){
                        result.judged=true
                      }
                      else{
                        result.judged=false
                      }
                    })

                    res.render('judgeCompEntrantsList',  {entrants:results, competition_id: data});
                });
           })
      };



   this.judge=function (req, res){
    req.services(function(err, services){
        var judgeDataServ = services.judgeDataServ;
          var comp_id = req.params.competition_id;
          var entrant_id = req.params.id;
          judgeDataServ.getEntrant(entrant_id, function(err, startup) {
            if( err )console.log(err);
             judgeDataServ.getCriteria(comp_id, function(err, criterias) {
               console.log(req.params);
               criterias.forEach(function(cri){
                    if(cri.elemID == undefined){
                      cri.elemID = cri.name.replace(/ /g,'')
                    }
                    else{
                      cri.elemID = cri.name.replace(/ /g,'')
                    }

                });
                res.render('judgeComp',{criterias:criterias, startup:startup[0],comp_id:comp_id,entrant_id:entrant_id});
            });
        });
      });
  }
  this.showEntrantResult = function(req, res, next){
        req.services(function(err,services){
           var judgeService = services.judgeDataServ;
           var data = req.params.entrant_id;
           judgeService.getEntrantTotal(data, function(err, results) {
                  if (err) return next(err);
                  console.log('\n\n\t RESULTS')
                  console.log(JSON.stringify(results))

                  res.render('entrantResults',  {results:results, name:results[0].name});
              });
         })
    };
  this.totals = function(req, res, next){
        req.services(function(err,services){
           var judgeService = services.judgeDataServ;
           var data = req.params.competition_id;
           judgeService.getTotals(data, function(err, results) {
                  if (err) return next(err);
                  res.render('totals',  {totals:results});
              });
         })
    };

  /* FOLLOWING METHOD STILL NEEDS TO BE REFACTORED & CLEANED */
  this.scoreStartup=function (req, res){
    req.services(function(err, services){
        var judgeDataServ = services.judgeDataServ;
          var comp_id = req.params.competition_id;
          var entrant_id = req.params.id;
            console.log(req.params);
          //console.log('\nscores submitted\n')
          var scores = req.body
          console.log('\n\n\t----DEBUGING SCORES----')
          console.log('\tSCORES:\t'+JSON.stringify(scores))

          for(sc in scores){
            var data ={
                      competition_id: comp_id,
                      entrant_id:entrant_id,
                      judge_id:1,      /* We'll change this when we have Judge profiles to use judge id's */
                      criteria_id:scores[sc][0],
                      points:scores[sc][1],
                      feedback:scores[sc][2]
                    }
                    console.log('\n\tPOINTS:\t'+JSON.stringify(data.points)+'\tCRITERIA:'+data.criteria_id)
                  
                        judgeDataServ.scoreStartup(data,function(err,results){
                              if(err){console.log('\nHERE:'+err+'\n\n')}

                          });
                    
          }
            judgeDataServ.entrantJudgedStatus([1,entrant_id],function(){
                      if(err){console.log('\n'+err+'\n\n')}
             })

          judgeDataServ.getComps(function(err, results1) {
            console.log('Im here')
              var comp_id = req.params.competition_id;
                 if (err) return next(err);
                 judgeDataServ.getCompEntrants(comp_id, function(err, results) {
                        if (err) return next(err);
                        //res.send('/judge/comp/'+comp_id+'/totals');
                        res.send('/judge/compList/entrants/'+comp_id);

                    });
             });

    });

  }
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//log user in or redirect
exports.login = function (req, res){
    if(req.session.user ){
        user.username = req.session.user;
        res.render('loggedIn', {
                user: req.session.user
        });

    }
    else{
        res.render('home');
    }
}

//render error msg if info entered incorrectly
exports.loggedIn = function (req, res) {
    if(req.session.user ){
        user.username = req.session.user;
        res.render('loggedIn', {
                user: req.session.user
            });

    }
    else if(lock == true){
       msg = "Your account has been locked";
        res.render('home', {
          msg:msg
        });
    }
    else{
      msg = "Incorrect username/password combination";
        res.render('home', {
          msg:msg
        });

    }

}

//signup function
exports.signUp = function (req, res){
  res.render('signUp');
}

//logout function
exports.logout = function (req, res){
    var msg = "You have logged out";
    delete req.session.user;
    res.render('home',{
                msg : msg
    });
}

//proceed to the next middleware component
exports.middleCheck = function(req, res, next){
  if(req.session.user){
      next();
  }
  else{
      res.redirect("/");
  }

}

//add user function
exports.addUser = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err){
            return next(err);
        }
        var input = JSON.parse(JSON.stringify(req.body));

        var data = {
            username : input.user,
            password: input.pass
        };

        if(data.username.trim() === "" || data.password.trim() === ""){
            res.render( 'signUp', {
                msg : "Fields cannot be blank"
            });
            return;
        }
        bcrypt.genSalt(10, function(err, salt) {
            bcrypt.hash(input.pass, salt, function(err, hash) {
                // Store hash in your password DB.
                data.password = hash;
                connection.query('insert into users set ?', data, function(err, results) {
                    if (err)
                        console.log("Error inserting : %s ",err );

                    res.render('home', {msg:"Successfully signed up"});
                });
            });
        });

    });
};

//check if user exists in database
exports.checkUser = function (req, res, next) {
    req.getConnection(function(err, connection){
        if (err)
            return next(err);

        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
            username : input.user,
            password: input.pass
        };
        //hash password to check against hashed password in database
        connection.query('SELECT password, role, locked from users WHERE username = ?', [data.username], function(err, results) {
            if (err) return next(err);
            if(results.length ==1){
            var user = results[0];


                bcrypt.compare(data.password, user.password, function(err, pass){
                    if(pass == true){
                        count = 0;

                        req.session.user = {username: data.username};

                        res.render('loggedIn', {
                            user: req.session.user
                        });
                    }
                    else{
                        count++;
                        msg = "Incorrect username/password combination";
                        if(count == 3){

                            msg = "Your account has been locked because of too many incorrest login attempts";
                            user.locked = true;
                            lock = true;
                            var locked = {
                                locked:user.locked
                            }
                            connection.query('update users set ? where username = ?',[locked, data.username], function(err, results) {
                                if (err)
                                    console.log("Error updating : %s ",err );
                            });
                        }
                        res.render('home', {
                          msg:msg
                        });
                    }
                });
            }
        });
    });
}
