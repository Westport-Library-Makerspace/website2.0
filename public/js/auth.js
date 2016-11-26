var config = {
  apiKey: "AIzaSyAGgBQTSn3zGYe5Gt18VhLBS7l0tsjh-Uo",
  authDomain: "makerspace-6d561.firebaseapp.com",
  databaseURL: "https://makerspace-6d561.firebaseio.com",
  storageBucket: "makerspace-6d561.appspot.com",
  messagingSenderId: "92352190485"
};
firebase.initializeApp(config);
var currentUser = firebase.auth().currentUser;

const emailInput = document.getElementById('emailInput');
const passwordInput = document.getElementById('passwordInput');
const firstNameInput = document.getElementById('firstNameInput');
const lastNameInput = document.getElementById('lastNameInput');
const ageInput = document.getElementById('ageInput');

var email;
var password;
var firstName;
var lastName;
var age;

var newUser = false;

$('#newUser').click(function(){
  email = emailInput.value;
  password = passwordInput.value;
  firstName = firstNameInput.value;
  lastName = lastNameInput.value;
  age = ageInput.value;
  firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error){

      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);

  }).then(function(){
      newUser = true;
  });
   email.value = "";
   password.value = "";
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    if(newUser){
      firebase.database().ref('users/' + user.uid).set({
     email: user.email,
     firstName: firstName,
     lastName: lastName,
     age: age

   }).then(function(){
      newUser=false;
     window.location = "/";
   });
  }

  } else {
    // No user is signed in.
  }
});
