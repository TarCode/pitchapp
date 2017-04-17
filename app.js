var express = require('express'),
    mysql = require('mysql'),
    exphbs  = require('express-handlebars'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    OrganiserMethods = require('./routes/organiser'),
    JudgeMethods = require('./routes/judge'),
    StartupMethods = require('./routes/startup'),
    userMethods =require('./routes/user')
    OrganiserDataService = require('./dataServices/organiserDataService'),
    JudgeDataService = require('./dataServices/judgeDataService'),
    startupDataService = require('./dataServices/startupDataService'),
    userDataService = require('./dataServices/userDataService'),
    ConnectionProvider = require('./routes/connectionProvider');
    //session = require('express-session');


var app = express();

var dbOptions = {
     host: 'localhost',
      user: 'root',
      password: '',
      port: 3306,
      database: 'pitchapp'
};

var serviceSetupCallback = function(connection){
	return {
		organiserDataServ : new OrganiserDataService(connection),
    startupDataServ : new startupDataService(connection),
    judgeDataServ : new JudgeDataService(connection),
    userDataServ : new userDataService(connection)
	}
};

var myConnectionProvider = new ConnectionProvider(dbOptions, serviceSetupCallback);
app.use(myConnectionProvider.setupProvider);
app.use(myConnection(mysql, dbOptions, 'pool'));
app.use(cookieParser());
app.use(session({secret:'veryfunnysecret'}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



var startup = new StartupMethods();
var user = new userMethods();
app.get('/', startup.land);
app.get('/login',user.showLogin)
app.get('/startup/compList', startup.showCompList);
app.post('/login',user.login)
app.use(function(req,res,next){
   console.log('req.url'+req.url+'\nreq.session.user : '+JSON.stringify(req.session.user))
    if(req.session.user){
      next();
    }
    else{
      res.render('pleaselogin')
    }
})




app.get('/startup/comp/:id', startup.startupComp);
app.get('/startup/new/:id', startup.newStartup);
app.post('/startup/new/add/:id', startup.addStartup);

var organiser = new OrganiserMethods();
app.get('/org/compList', organiser.showOrgList);
app.get('/org/comp/new', organiser.newComp);
app.post('/org/comp/new/add', organiser.addComp);
app.get('/org/comp/:id', organiser.comp);
app.get('/org/comp/delete/:id', organiser.delComp);
app.get('/org/startup/delete/:id', organiser.delStartup);

var judge = new JudgeMethods();
app.get('/judge/compList', judge.showCompList);
app.get('/judge/results/:entrant_id', judge.showEntrantResult);
app.post('/judge/results/updateScoreFeedback/:entrant_id/:score_id', judge.updateScoreFeedback);
app.get('/judge/compList/entrants/:competition_id',judge.showCompEntrants);
app.get('/judge/:competition_id/:id', judge.judge);
app.post('/judge/:competition_id/:id', judge.scoreStartup);
app.get('/judge/comp/:competition_id/totals', judge.totals);


//middleware user check
//app.use(main.middleCheck);

var port = process.env.PORT || 3100;
var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('pitchapp listening at http://%s:%s', host, port);

});
