module.exports = function(){

  this.login = function(req, res, next){

        req.services(function(err,services){
          
              var userService = services.userDataServ;
              userService.getUsers(function(err, results) {
                 if (err) return next(err);
                  console.log('client details')
                  console.log(req.body.name+' '+req.body.password)
                  console.log(results)
                  results.forEach(function(result){
                     console.log(result.username +' '+ req.body.name +' ' +result.password +' '+ req.body.password)
                     console.log(result.username === req.body.name && result.password == req.body.password)
                    if(result.username === req.body.name && result.password == req.body.password){

                        var user = {
                                name:result.username,
                                organiser:result.type==1,
                                judge:result.type==2,
                                startup:result.type==3
                        }
                        req.session.user = user
                        res.redirect('/')
                      
                    }

                  })
                
                 
                

              });
         
           
           
           
         })
    };
    this.showLogin = function(req,res,next){
      res.render('pleaselogin')
    }

}