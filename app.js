var express = require('express'),
partials = require('express-partials');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var cookieParser = require('cookie-parser');
var app = express();
var moment = require('moment');

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
  if(token){
  admin.auth().verifyIdToken(token).then(function(decodedToken){
    admin.database().ref("/users/" + decodedToken.uid).ref.on("value", function(snapshot){
      console.log(snapshot.val());
      res.render('landing',{layout:'layout_landing', userFirstName: snapshot.val().firstName});
    });

  }).catch(function(){
    res.render('landing',{layout:'layout_landing', userFirstName: "Login"});
  });
}
else{
  res.render('landing',{layout:'layout_landing', userFirstName: "Login"});
}


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
  admin.auth().verifyIdToken(token).then(function(decodedToken){
  }).catch(function(){
    res.redirect('/');
  });

  res.render('login');

}
});


app.get('/training/:id', urlencodedParser, function(req,res){
  var id = req.params.id;
  var dayOfWeek = moment(id).format("ddd");
  console.log(dayOfWeek);
  var coaches = [];

  admin.database().ref("/users/").ref.on("value", function(snapshot){
    snapshot.forEach(function(child){
    if(child.val().schedule_times){

//.start_time + "`" + child.val().uid);

//TODO PLEASE MAKE THIS BETTER
  console.log(dayOfWeek);
      switch(dayOfWeek){
        case "Mon":
          coaches.push(child.val().schedule_times.Mon.start_time + "`" + child.val().uid);
          break;
        case "Tue":
          coaches.push(child.val().schedule_times.Tue.start_time + "`" + child.val().uid);
          break;
        case "Wed":
          coaches.push(child.val().schedule_times.Wed.start_time + "`" + child.val().uid);
          break;
        case "Thu":
          coaches.push(child.val().schedule_times.Thu.start_time + "`" + child.val().uid);
          break;
        case "Fri":
          coaches.push(child.val().schedule_times.Fri.start_time + "`" + child.val().uid);
          break;
        case "Sat":
          coaches.push(child.val().schedule_times.Sat.start_time + "`" + child.val().uid);
          break;
        case "Sun":
          coaches.push(child.val().schedule_times.Sun.start_time + "`" + child.val().uid);
          break;
      }

    }
  });

});
res.render("training", {coaches: coaches});
});



app.get('/training', function(req,res){
    res.render('training', {coaches: null});
});

app.get('/admin', function(req,res){
  res.render('admin');
});

app.get('/coach-schedule', function(req, res){
  token = req.cookies.token;
  if(token){
    admin.auth().verifyIdToken(token).then(function(decodedToken){
      res.render('coach_schedule');
    }).catch(function(){
      res.redirect('/');
    });
}else{
  res.redirect('/');
}
});



app.listen(3000, function () {
  console.log('Server port listening on port 3000!');
});
