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
var db = admin.database();
var jsonParser = bodyParser.json();


app.get('/', function (req, res) {
  var token;
  var cookie;
  if(req.cookies.token){
   cookie = req.cookies.token;
 }
   if(cookie){
     token = cookie.split(",")[0];
    }


   //res.send(cookie);
  if(token){
  admin.auth().verifyIdToken(token).then(function(decodedToken){
    admin.database().ref("/users/" + decodedToken.uid).ref.on("value", function(snapshot){
      console.log(snapshot.val());
      res.render('landing',{layout:'layout_landing', userFirstName: snapshot.val().firstName});
    });
  }).catch(function(error){
    console.log(error.message);
    res.render('landing',{layout:'layout_landing', userFirstName: "AHHHH!"});
    });
  }
  else{
    console.log("No User!");
    res.render('landing',{layout:'layout_landing', userFirstName: "Login"});
  }

});

app.get('/dashboard', function(req,res){
  var cookie= req.cookies.token;
  var token = cookie.split(",")[0];
  var training_list = [];

  if(token){
    admin.auth().verifyIdToken(token).then(function(decodedToken){
      db.ref("/users/" + decodedToken.uid).ref.on("value", function(snapshot){
        db.ref("/training").ref.on("value", function(trainings){
          trainings.forEach(function(training){
            if(training.val().coach_uid == snapshot.val().uid){
              if(moment().diff(moment(training.val().date), 'days') <= 0){
                training_list.push(moment(training.val().date).format('MMMM Do YYYY, h:mm:ss a'));
              }
            }
          });
        });
        //console.log(training_list);
        res.render("dashboard", {user: snapshot.val(), training_list: training_list});
      });
    }).catch(function(){
      res.redirect("/");
    });
  }
  else{
    res.redirect("/");
  }
});

app.get('/login', function (req, res) {
  res.render('login', {user: ''});


});

app.get('/waiver', function(req,res){
  res.render("waiver");
});

app.get('/training/:id', urlencodedParser, function(req,res){
  var id = req.params.id;
  var dayOfWeek = moment(id).format("ddd");
  console.log(dayOfWeek);
  var coaches = [];


  //Grab the coaches availible for the selected day and add them to an array
  db.ref("/users/").ref.on("value", function(snapshot){
    snapshot.forEach(function(child){
    if(child.val().schedule_times){
      console.log(dayOfWeek);
      switch(dayOfWeek){
        case "Mon":
        var free = true;
        if(child.val().schedule_times.Mon){
          db.ref("/users/" + child.val().uid + "/schedule_times/exceptions/").ref.on("value", function(childSnapshot){
            childSnapshot.forEach(function(exception){
              if(exception.val().date == id){
                free = false;
              }
            });
          });

        if(free){
          coaches.push(moment(child.val().schedule_times.Mon.start_time).format("dddd, hh:mm a") + "`" + child.val().uid);
        }
        }
          break;
        case "Tue":
        free = true;
        if(child.val().schedule_times.Tue){
          db.ref("/users/" + child.val().uid + "/schedule_times/exceptions/").ref.on("value", function(childSnapshot){
            childSnapshot.forEach(function(exception){
              if(exception.val().date == id){
                free = false;
              }
            });
          });

        if(free){
          coaches.push(child.val().schedule_times.Tue.start_time + "`" + child.val().uid);
        }
        }
          break;
        case "Wed":
          free = true;
          if(child.val().schedule_times.Wed){
          db.ref("/users/" + child.val().uid + "/schedule_times/exceptions/").ref.on("value", function(childSnapshot){
            childSnapshot.forEach(function(exception){
              if(exception.val().date == id){
                free = false;
              }
            });
          });

          if(free){
          coaches.push(child.val().schedule_times.Wed.start_time + "`" + child.val().uid);
          }
        }
          break;
        case "Thu":
        free = true;
        if(child.val().schedule_times.Thu){
        db.ref("/users/" + child.val().uid + "/schedule_times/exceptions/").ref.on("value", function(childSnapshot){
          childSnapshot.forEach(function(exception){
            if(exception.val().date == id){
              free = false;
            }
          });
        });

        if(free){
        coaches.push(child.val().schedule_times.Thu.start_time + "`" + child.val().uid);
        }
      }
        break;
        case "Fri":
        free = true;
        if(child.val().schedule_times.Fri){
        db.ref("/users/" + child.val().uid + "/schedule_times/exceptions/").ref.on("value", function(childSnapshot){
          childSnapshot.forEach(function(exception){
            if(exception.val().date == id){
              free = false;
            }
          });
        });

        if(free){
        coaches.push(child.val().schedule_times.Fri.start_time + "`" + child.val().uid);
        }
      }
        break;
        case "Sat":
        free = true;
        if(child.val().schedule_times.Sat){
        db.ref("/users/" + child.val().uid + "/schedule_times/exceptions/").ref.on("value", function(childSnapshot){
          childSnapshot.forEach(function(exception){
            if(exception.val().date == id){
              free = false;
            }
          });
        });

        if(free){
        coaches.push(child.val().schedule_times.Sat.start_time + "`" + child.val().uid);
        }
      }
        break;
        case "Sun":
        free = true;
        if(child.val().schedule_times.Sun){
        db.ref("/users/" + child.val().uid + "/schedule_times/exceptions/").ref.on("value", function(childSnapshot){
          childSnapshot.forEach(function(exception){
            if(exception.val().date == id){
              free = false;
            }
          });
        });

        if(free){
        coaches.push(child.val().schedule_times.Sun.start_time + "`" + child.val().uid);
        }
      }
        break;
        }

      }
    });

  });
  res.render("training", {coaches: coaches, time: true, user: ''});
});

app.get('/training', function(req,res){
    res.render('training', {coaches: null, time: false, user: ''});
});

app.get('/admin', function(req,res){
  var cookie= req.cookies.token;
  var token = cookie.split(",")[0];
  if(token){
  admin.auth().verifyIdToken(token).then(function(decodedToken){
    admin.database().ref("/users/" + decodedToken.uid).ref.on("value", function(snapshot){
      console.log(snapshot.val());
      res.render('admin',{user: snapshot.val()});
    });
  });
  }
  else{
    res.redirect('/');
  }
});

app.get('/coach-schedule', function(req, res){
  token = req.cookies.token;
  if(token){
    admin.auth().verifyIdToken(token).then(function(decodedToken){
      res.render('coach_schedule');
    }).catch(function(){
      res.redirect('/');
    });
  }

  else{
  res.redirect('/');
  }
});

app.get('/redir', function(req,res){
  res.redirect('/');
});

app.get('/users/:id', function(req, res){

  var user_id = req.params.id;
  var page_user = {};
  var cookie= req.cookies.token;
  var token = cookie.split(",")[0];
  if(token){
  admin.auth().verifyIdToken(token).then(function(decodedToken){
    admin.database().ref("/users/" + decodedToken.uid).ref.on("value", function(snapshot){
      db.ref("/users/" + user_id).ref.on("value", function(user_data){
        page_user = user_data.val();
      });
        console.log(page_user.email);
        res.render('user',{page_user: page_user, moment: moment, user: snapshot.val()});

    });
  });
  }
  else{
    res.redirect('/');
  }


});

app.listen(3000, function () {
  console.log('Server port listening on port 3000!');
});
