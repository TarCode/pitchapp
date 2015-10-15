var express = require('express'),
    mysql = require('mysql'),
    exphbs  = require('express-handlebars'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),

    OrganiserMethods = require('./routes/organiser'),
    JudgeMethods = require('./routes/judge'),
    StartupMethods = require('./routes/startup'),

    OrganiserDataService = require('./dataServices/organiserDataService'),

    ConnectionProvider = require('./routes/connectionProvider');
    //session = require('express-session');


var app = express();

var dbOptions = {
     host: 'localhost',
      user: 'tarcode',
      password: 'coder123',
      port: 3306,
      database: 'pitchapp'
};

var serviceSetupCallback = function(connection){
	return {
		organiserDataServ : new OrganiserDataService(connection)
    //startupDataServ : new startupDataService(connection),
    //judgeDataServ : new judgeDataService(connection)
	}
};

var myConnectionProvider = new ConnectionProvider(dbOptions, serviceSetupCallback);
app.use(myConnectionProvider.setupProvider);
app.use(myConnection(mysql, dbOptions, 'pool'));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(session({secret: "bookworms", cookie: {maxAge: 120000}, resave:true, saveUninitialized: false}));

app.get('/', StartupMethods.land);

var organiser = new OrganiserMethods();
app.get('/org/compList', organiser.showOrgList);
app.get('/org/comp/new', organiser.newComp);
app.post('/org/comp/new/add', organiser.addComp);
app.get('/org/comp/:id', organiser.comp);
app.get('/org/comp/delete/:id', organiser.delComp);
app.get('/org/startup/delete/:id', organiser.delStartup);

app.get('/startup/compList', StartupMethods.showStartupList);
app.get('/startup/comp/:id', StartupMethods.startupComp);
app.get('/startup/new/:id', StartupMethods.newStartup);
app.post('/startup/new/add/:id', StartupMethods.addStartup);


app.get('/judge/:competition_id/:startup_id', JudgeMethods.judge);



//middleware user check
//app.use(main.middleCheck);

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('pitchapp listening at http://%s:%s', host, port);

});
