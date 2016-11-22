var config = {
  apiKey: "AIzaSyAGgBQTSn3zGYe5Gt18VhLBS7l0tsjh-Uo",
  authDomain: "makerspace-6d561.firebaseapp.com",
  databaseURL: "https://makerspace-6d561.firebaseio.com",
  storageBucket: "makerspace-6d561.appspot.com",
  messagingSenderId: "92352190485"
};
firebase.initializeApp(config);
var currentUser = firebase.auth().currentUser;

const email = document.getElementById('email-input');
const password = document.getElementById('password-input');
var newUser = false;

$('#login').click(function(){

  firebase.auth().createUserWithEmailAndPassword(email.value, password.value).catch(function(error){

      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);

  }).then(function(){
      newUser = true;
  });
  // email.value = "";
  // password.value = "";
});
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    if(newUser){
      firebase.database().ref('users/' + user.uid).set({
     //username: currentname,
     email: user.email

   }).then(function(){
      newUser=false;
     window.location = "/";
   });   
  }

  } else {
    // No user is signed in.
  }
});
