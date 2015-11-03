//var bcrypt = require('bcrypt');
var count = 0;
var user = {};
lock = false;
var startupNum = 0;
module.exports = function(){

  this.showCompList = function(req, res, next){

        req.services(function(err,services){
           var judgeService = services.judgeDataServ;
           judgeService.getComps(function(err, results1) {
             var data = results1[0].id;
             console.log(results1);
                  if (err) return next(err);
                  judgeService.getCompEntrants(data, function(err, results) {
                         if (err) return next(err);
                         res.render('judgeCompList',  {comp: results1, entrants:results[0]});
                     });
              });
         })
    };

    this.showCompEntrants = function(req, res, next){

          req.services(function(err,services){
             var judgeService = services.judgeDataServ;
             var data = req.params.competition_id;
             judgeService.getCompEntrants(data, function(err, results) {
                    if (err) return next(err);
                    res.render('judgeCompEntrantsList',  {entrants:results});
                });
           })
      };

   this.judge=function (req, res){
    req.services(function(err, services){
        var judgeDataServ = services.judgeDataServ;
          var comp_id = req.params.competition_id;
          var startup_id = req.params.startup_id;
          judgeDataServ.getEntrants(startup_id, function(err, startup) {
            if( err )console.log(err);

             judgeDataServ.getCriteria(comp_id, function(err, criterias) {

               criterias.forEach(function(cri){
                    if(cri.elemID == undefined){
                      cri.elemID = cri.name.replace(/ /g,'')
                    }
                    else{
                      cri.elemID = cri.name.replace(/ /g,'')
                    }

                });
                res.render('judgeComp',{criterias:criterias, startup:startup[0],comp_id:comp_id,startup_id:startup_id});
              });
        });
      });
  }
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
          var startup_id = req.params.startup_id;
          //console.log('\nscores submitted\n')
          var scores = req.body
          for(sc in scores){
            var data ={
                      entrant_id:startup_id,
                      judge_id:comp_id,      /* We'll change this when we have Judge profiles to use judge id's */
                      criteria_id:scores[sc][0],
                      points:scores[sc][1],
                      feedback:scores[sc][2]
                    }
                    judgeDataServ.scoreStartup(data,function(err,results){
                          if(err){console.log('\n'+err+'\n\n')}
                      });

          }
          judgeDataServ.getComps(function(err, results1) {
            var data = results1[0].id;
            console.log(results1);
                 if (err) return next(err);
                 judgeDataServ.getCompEntrants(data, function(err, results) {
                        if (err) return next(err);
                        console.log(results);
                    if(startupNum <= results.length && results.length != 0 && results != undefined){
                      startupNum++;
                      console.log(results[startupNum]);
                      res.send('/judge/'+data+'/'+results[startupNum].startup_id);

                    }
                    else{
                      startupNum = 0;
                      res.send('/judge/'+data+'/totals');
                    }

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
