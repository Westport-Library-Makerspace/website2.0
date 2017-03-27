$(document).ready(function(){
  token = document.cookie.token;
var config = {
  apiKey: "AIzaSyAGgBQTSn3zGYe5Gt18VhLBS7l0tsjh-Uo",
  authDomain: "makerspace-6d561.firebaseapp.com",
  databaseURL: "https://makerspace-6d561.firebaseio.com",
  storageBucket: "makerspace-6d561.appspot.com",
  messagingSenderId: "92352190485"
};



firebase.initializeApp(config);



var email;
var firstName;
var lastName;
var userId;
var submit;
var type;

var $date = $('#date-input').pickadate();
var $time = $('#time-input').pickatime();
//console.log(moment().format("ddd, D MMM YYYY hh:mm:ss"));

  //$('.log-btn').html('<a class="page-scroll " href="/login"></a>');
$('#training-submit').click(function(){
  var date = $input.get('select');
  var day = moment(date.getISOString);
  email = $('#email-input').val();
  firstName = $('#firstName-input').val();
  lastName = $('#lastName-input').val();
  console.log(email, firstName, lastName, day.format());
  if(day.format() < day.add(3, 'hours').format() || day.format() > day.subtract(3, 'hours').format()){
  }

});

console.log($("time-format0").text());

$('.logout').click(function(){
  logOut();
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    var name;
    setCookie();
  }
  else{
    // No user is signed in.
    console.log("Not Logged in!");
    console.log(document.cookie);
    //unsetCookie();
    eraseCookieFromAllPaths("token");
  }
});

function logOut(){
  eraseCookieFromAllPaths("token");
  firebase.auth().signOut().then(function() {
  console.log("Logged Out");
}, function(error) {
  console.log("Log out failed");
}).then(function(){
  window.location="/";
});
}
$('#coach-submit').click(function(){
  var date = $date.val();
  var time = $time.val();
  var day = date + " " + time ;

  day = moment(day, ['DDMMMMY HH:mm a']);
  console.log(day.format('dd'));
  firebase.database().ref('users/' + userId + '/schedule_times/' + day.format('ddd')).set({
    start_time: day.format(),
    end_time: day.add(2, 'hour').format()

}).then(function(){
  window.location = "/";
});

});

function setCookie(){
  firebase.auth().currentUser.getToken(true).then(function(idToken){
    document.cookie =  "token="+idToken+",expires=" + moment().add(1, 'month').format("ddd, D MMM YYYY hh:mm:ss") + " UTC,path=/";  });
}

//moment().format('MMMM Do YYYY, h:mm:ss a');
function eraseCookieFromAllPaths(name) {
    // This function will attempt to remove a cookie from all paths.
    var pathBits = location.pathname.split('/');
    var pathCurrent = ' path=';

    // do a simple pathless delete first.
    document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;';

    for (var i = 0; i < pathBits.length; i++) {
        pathCurrent += ((pathCurrent.substr(-1) != '/') ? '/' : '') + pathBits[i];
        document.cookie = name + '=; expires=Thu, 01-Jan-1970 00:00:01 GMT;' + pathCurrent + ';';
    }
}

});
