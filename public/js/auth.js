var config = {
  apiKey: "AIzaSyAGgBQTSn3zGYe5Gt18VhLBS7l0tsjh-Uo",
  authDomain: "makerspace-6d561.firebaseapp.com",
  databaseURL: "https://makerspace-6d561.firebaseio.com",
  storageBucket: "makerspace-6d561.appspot.com",
  messagingSenderId: "92352190485"
};
firebase.initializeApp(config);
var currentUser = firebase.auth().currentUser;

const createEmailInput = document.getElementById('createEmailInput');
const createPasswordInput = document.getElementById('createPasswordInput');
const createFirstNameInput = document.getElementById('createFirstNameInput');
const createLastNameInput = document.getElementById('createLastNameInput');
const createAgeInput = document.getElementById('createAgeInput');
const loginEmailInput = document.getElementById('loginEmailInput');
const loginPasswordInput = document.getElementById('loginPasswordInput');

var createEmail;
var createPassword;
var createFirstName;
var createLastName;
var createAge;
var loginEmail;
var loginPassword;

var newUser = false;

$('#newUser').click(function(){
  createEmail = createEmailInput.value;
  createPassword = createPasswordInput.value;
  createFirstName = createFirstNameInput.value;
  createLastName = createLastNameInput.value;
  createAge = createAgeInput.value;
  firebase.auth().createUserWithEmailAndPassword(createEmail, createPassword).catch(function(error){

      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorMessage);

  }).then(function(){
      newUser = true;
  });
   emailInput.value = "";
   passwordInput.value = "";
});

$('#loginUser').click(function(){
  loginEmail = loginEmailInput.value;
  loginPassword = loginPasswordInput.value;
  firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  });
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

    if(newUser){
      firebase.database().ref('users/' + user.uid).set({
     email: user.email,
     firstName: createFirstName,
     lastName: createLastName,
     age: createAge

   }).then(function(){
      newUser=false;
     window.location = "/";
   });
  }

  } else {
    // No user is signed in.
  }
});
