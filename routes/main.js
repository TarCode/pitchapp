//var bcrypt = require('bcrypt');
var count = 0;
var user = {};
lock = false;

//log user in or redirect
exports.land = function (req, res){
    res.render('land');

}

exports.showOrgList = function(req, res, next){
      req.getConnection(function(err, connection){
       if (err)
           return next(err);

                connection.query('SELECT id, name, image_url, entrants, organizer, description, location, DATE_FORMAT(date, "%d/%l/%Y") as date, start_time, end_time  FROM competition', [], function(err, results) {
                    if (err) return next(err);
                 res.render('orgList',  {comp:results});
            });

    });
  };
  exports.showStartupList = function(req, res, next){
        req.getConnection(function(err, connection){
         if (err)
             return next(err);

                  connection.query('SELECT id, name, image_url, entrants, organizer, description, location, DATE_FORMAT(date, "%d/%l/%Y") as date, start_time, end_time  FROM competition', [], function(err, results) {
                      if (err) return next(err);
                   res.render('startupList',  {comp:results});
              });

      });
    };

exports.newStartup = function (req, res){
    res.render('newStartup', {comp_id : req.params.id});

}

exports.addStartup = function (req, res, next){
  req.getConnection(function(err, connection){
   if (err)  console.log(err);
   var input = JSON.parse(JSON.stringify(req.body));
   var data = {
     name: input.startup_name,
     image_url: "/img/"+input.image_url,
     location: input.location,
     industry: input.industry,
     sector: input.sector,
     employees: input.employees,
     stage: input.stage,
     turnover: input.turnover
   }

      connection.query('INSERT INTO startup SET ?', [data], function(err, results) {
        if (err) console.log(err);
          connection.query('SELECT id FROM startup WHERE name = ?', [data.name], function(err, startup_id) {
            if (err) console.log(err);
            var entryData = {
              startup_id : startup_id[0].id,
              competition_id : req.params.id
            }
            connection.query('INSERT INTO entrants SET ?', [entryData], function(err, results) {
              if (err) console.log(err);
              res.redirect('/startup/compList');
            });
          });
      });

  });
}
exports.comp = function (req, res, next){
  req.getConnection(function(err, connection){
   if (err)
       return next(err);
            var comp_id = req.params.id;
            connection.query('SELECT id, name, image_url, entrants, organizer, description, location, DATE_FORMAT(date, "%d/%l/%Y") as date, start_time, end_time FROM competition WHERE id = ?', [comp_id], function(err, results) {
                if (err) return next(err);
                connection.query('SELECT * FROM startup, entrants WHERE startup.id = entrants.startup_id AND entrants.competition_id = ?', [comp_id], function(err, results1) {
                    if (err) return next(err);
                  res.render('compProfile',  {comp:results,
                                              entrants: results1});
                });
            });

  });
}

exports.startupComp = function (req, res, next){
  req.getConnection(function(err, connection){
   if (err)
       return next(err);
            var comp_id = req.params.id;
            connection.query('SELECT id, name, image_url, entrants, organizer, description, location, DATE_FORMAT(date, "%d/%l/%Y") as date, start_time, end_time FROM competition WHERE id = ?', [comp_id], function(err, results) {
                if (err) return next(err);
                res.render('startupCompProfile',  {comp:results});
        });

  });
}

exports.delComp = function (req, res, next){
  req.getConnection(function(err, connection){
   if (err)  console.log(err);
      var comp_id = req.params.id;
      connection.query('DELETE FROM competition WHERE id = ?', [comp_id], function(err, results) {
          if (err) console.log(err);
          res.redirect('/compList');
      });

  });
}

exports.delStartup = function (req, res, next){
  req.getConnection(function(err, connection){
   if (err)  console.log(err);
      var startup_id = req.params.id;
      connection.query('SELECT competition_id FROM entrants WHERE startup_id = ?', [startup_id], function(err, comp_id) {
          if (err) console.log(err);
          var comp_id = comp_id[0].competition_id;
          connection.query('DELETE FROM startup WHERE id = ?', [startup_id], function(err, results) {
              if (err) console.log(err);
              connection.query('DELETE FROM entrants WHERE startup_id = ?', [startup_id], function(err, results) {
                  if (err) console.log(err);
                res.redirect('/org/comp/'+comp_id+"#entrants");
              });
          });
      });

  });
}

exports.newComp = function (req, res){
    res.render('newComp');

}
exports.addComp = function (req, res, next){
  req.getConnection(function(err, connection){
   if (err)  console.log(err);
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
      connection.query('INSERT INTO competition SET ?', [data], function(err, results) {
          if (err) console.log(err);
          res.redirect('/compList');
      });

  });
}

exports.judge = function (req, res){
    req.getConnection(function(err, connection){
          var comp_id = req.params.competition_id;
          var startup_id = req.params.startup_id;
          connection.query('SELECT * FROM startup, entrants WHERE startup.id = entrants.startup_id AND entrants.startup_id = ?',[startup_id], function(err, startup) {
            if( err )console.log(err);

              connection.query('SELECT * FROM competition_criteria WHERE competition_id = ?',[comp_id], function(err, criterias) {

               criterias.forEach(function(cri){
                    if(cri.elemID == undefined){
                      cri.elemID = cri.name.replace(/ /g,'')
                    }
                    else{
                      cri.elemID = cri.name.replace(/ /g,'')
                    }

                });
                res.render('judgeComp',{criterias:criterias, startup:startup[0]});
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
