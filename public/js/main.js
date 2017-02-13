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
//console.log(moment().format("ddd, D MMM YYYY hh:mm:ss"));



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


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    firebase.auth().currentUser.getToken(true).then(function(idToken){
      console.log(idToken);

      //$.post("/loginToken", {idToken: idToken});
    });
    var name;
    // No user is signed in.
    console.log("Not Logged in!");
    $('.log-btn').html('<a class="page-scroll " href="/login">'+ <%= user %> +'</a>');
  }
});

function logOut(){
  unsetCookie();
  firebase.auth().signOut().then(function() {
  console.log("Logged Out");
}, function(error) {
  console.log("Log out failed");
});
}
function unsetCookie(){
  document.cookie =  "token=;expires=;path=";
}
