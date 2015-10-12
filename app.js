var express = require('express'),
    mysql = require('mysql'),
    exphbs  = require('express-handlebars'),
    myConnection = require('express-myconnection'),
    bodyParser = require('body-parser'),
    main = require('./routes/main');
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

app.get('/', main.land);
app.get('/compList', main.showOrgList);
app.get('/newComp', main.newComp);
app.get('/comp/:id', main.comp);
app.get('/comp/delete/:id', main.delComp);

app.get('/judge', main.judge);



//middleware user check
//app.use(main.middleCheck);

var port = process.env.PORT || 3000;
var server = app.listen(port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('pitchapp listening at http://%s:%s', host, port);

});
