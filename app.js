var express = require('express'),
partials = require('express-partials');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cookieParser = require('cookie-parser');
var app = express();

var admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert("makerspace-6d561-firebase-adminsdk-c3lhm-67398b8567.json"),
  databaseURL: "https://makerspace-6d561.firebaseio.com"
});
app.use(cookieParser());
app.use(partials());
app.use(express.static('public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.set('view engine', 'ejs');
app.set('views', './views');
var jsonParser = bodyParser.json();


app.get('/', function (req, res) {
  var token = req.cookies.token;
  var firstName;
  res.render('landing', {layout:'layout_landing'});


});

app.get('/login', function (req, res) {
  var token = req.cookies.token;
  console.log(token);
  if(!token){
  admin.auth().verifyIdToken(token).then(function(decodedToken){
    }).catch(function(error){
      res.render('login');
      console.log("Error! no user records found!");
    });
  }
else{
  res.redirect('/');
}
});

app.get('/training', function(req,res){
  res.render('training');
});

app.get('/admin', function(req,res){
  res.render('admin');
});

app.get('/coach-schedule', function(req, res){
  res.render('coach_schedule');
});



app.listen(3000, function () {
  console.log('Server port listening on port 3000!');
});
