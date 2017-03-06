var config = {
  apiKey: "AIzaSyAGgBQTSn3zGYe5Gt18VhLBS7l0tsjh-Uo",
  authDomain: "makerspace-6d561.firebaseapp.com",
  databaseURL: "https://makerspace-6d561.firebaseio.com",
  storageBucket: "makerspace-6d561.appspot.com",
  messagingSenderId: "92352190485"
};

firebase.initializeApp(config);


var currentUser = firebase.auth().currentUser;

var createEmailInput = document.getElementById('createEmailInput');
var createPasswordInput = document.getElementById('createPasswordInput');
var createFirstNameInput = document.getElementById('createFirstNameInput');
var createLastNameInput = document.getElementById('createLastNameInput');
var createAgeInput = document.getElementById('createAgeInput');
var loginEmailInput = document.getElementById('loginEmailInput');
var loginPasswordInput = document.getElementById('loginPasswordInput');

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
  //$.post("/loginToken", {loginEmail: loginEmail, loginPassword: loginPassword});
  console.log("Logging in!");
  firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).catch(function(error){
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage);
  }).then(function(){
    newUser = false;
    setCookie();

  });
});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log("User Logged in?");
    if(newUser){
      firebase.database().ref('users/' + user.uid).set({
      uid: user.uid,
     email: user.email,
     firstName: createFirstName,
     lastName: createLastName,
     age: createAge

   }).then(function(){
      newUser=false;
   });
  }
  setCookie();


  } else {
    console.log("No user is logged in");
    unsetCookie();
  }
});

function setCookie(){
  firebase.auth().currentUser.getToken(true).then(function(idToken){
    document.cookie =  "token="+idToken+";expires=" + moment().add(7, 'days').format("ddd, D MMM YYYY hh:mm:ss") + " UTC;path=/";
    console.log(document.cookie);
  });
}

function unsetCookie(){
  firebase.auth().currentUser.getToken(true).then(function(idToken){
    document.cookie =  "token=;expires= UTC;path=";
    console.log(document.cookie);
  });
}
