//var bcrypt = require('bcrypt');
var count = 0;
var user = {};
lock = false;

//log user in or redirect
exports.land = function (req, res){
    res.render('land');

}

  exports.showStartupList = function(req, res){
        
        req.services(function(err,services){
           var startupService = services.startupDataServ;
           startupService.getStartups(function(err, results) {
                  if (err) return next(err);
                  res.render('startupList',  {comp:results});
              });
         })
                 


    };

exports.newStartup = function (req, res){
    res.render('newStartup', {comp_id : req.params.id});

}

exports.addStartup = function (req, res, next){

      req.services(function(err,services){
          var startupService = services.startupDataServ;
        
           
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

          startupService.addStartup(data, function(err, results) {
              if (err) console.log(err);

                  var entryData = { name :data.name, competition_id : req.params.id }


                  startupService.enter(entryData, function(err, results) {
                     if (err) console.log(err);

                      res.redirect('/startup/compList');

                  });
          });
           


      })

          
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
