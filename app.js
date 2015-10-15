var express = require('express'),
    mysql = require('mysql'),
    exphbs  = require('express-handlebars'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    organiser = require('./routes/organiser'),
    judge = require('./routes/judge'),
    startup = require('./routes/startup');
    //session = require('express-session');


var app = express();

var dbOptions = {
     host: 'localhost',
      user: 'tarcode',
      password: 'coder123',
      port: 3306,
      database: 'pitchapp'
};

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(myConnection(mysql, dbOptions, 'single'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(session({secret: "bookworms", cookie: {maxAge: 120000}, resave:true, saveUninitialized: false}));

app.get('/', startup.land);

app.get('/org/compList', organiser.showOrgList);
app.get('/org/comp/new', organiser.newComp);
app.post('/org/comp/new/add', organiser.addComp);
app.get('/org/comp/:id', organiser.comp);
app.get('/org/comp/delete/:id', organiser.delComp);
app.get('/org/startup/delete/:id', organiser.delStartup);

app.get('/startup/compList', startup.showStartupList);
app.get('/startup/comp/:id', startup.startupComp);
app.get('/startup/new/:id', startup.newStartup);
app.post('/startup/new/add/:id', startup.addStartup);


app.get('/judge/:competition_id/:startup_id', judge.judge);



//middleware user check
//app.use(main.middleCheck);

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('pitchapp listening at http://%s:%s', host, port);

});
