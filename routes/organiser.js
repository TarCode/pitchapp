//var bcrypt = require('bcrypt');
var count = 0;
var user = {};
lock = false;
module.exports = function(){
//log user in or redirect
this.land = function (req, res){
    res.render('land');

}

this.showOrgList = function(req, res, next){
  req.services(function(err, services){
    		var organiserDataServ = services.organiserDataServ;
        organiserDataServ.getAllCompetitions(function(err, rows){
          if(err)	throw err;
            rows.forEach(function(row){
              row['user'] = req.session.user;
            })
            res.render( 'orgList', {
                comp : rows ,user:req.session.user
            });
        });

  });
}

  this.newComp = function (req, res){
      res.render('newComp');

  }
  this.addComp = function (req, res, next){
    req.services(function(err, services){
    		var organiserDataServ = services.organiserDataServ;
        var input = JSON.parse(JSON.stringify(req.body));
        var data = {
          name: input.comp_name,
          image_url: "/img/"+input.image_url,
          organizer: input.comp_name,
          entrants: input.entries,
          description: input.desc,
          location: input.location,
          date: input.date,
          start_time: input.start_time,
          end_time: input.end_time
        }
        organiserDataServ.insertCompetition(data, function(err, rows){
          if(err)	throw err;
          res.redirect('/org/compList');
        });
    });
  }

this.comp = function (req, res, next){
  req.services(function(err, services){
   var organiserDataServ = services.organiserDataServ;
            var data = req.params.id;
            organiserDataServ.getCompInfo(data, function(err, results){
                if (err) return next(err);
                organiserDataServ.getEntrantInfo(data, function(err, results1){
                    if (err) return next(err);
                  res.render('compProfile',  {comp:results,
                                              entrants: results1});
                });
            });

  });
}


this.delComp = function (req, res, next){
  req.services(function(err, services){
    var organiserDataServ = services.organiserDataServ;
      var comp_id = req.params.id;
      organiserDataServ.deleteComp(comp_id, function(err){
          if (err) console.log(err);
          res.redirect('/org/compList');
      });

  });
}

this.delStartup = function (req, res, next){
  req.services(function(err, services){
    var organiserDataServ = services.organiserDataServ;
      var startup_id = req.params.id;
      organiserDataServ.getCompId(startup_id, function(err, comp_id) {
          if (err) console.log(err);
          var comp_id = comp_id[0].competition_id;
          organiserDataServ.deleteStartup(startup_id, function(err, results) {
              if (err) console.log(err);
              organiserDataServ.deleteEntrant(startup_id, function(err, results) {
                  if (err) console.log(err);
                res.redirect('/org/comp/'+comp_id+"#entrants");
              });
          });
      });

  });
}


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
}
