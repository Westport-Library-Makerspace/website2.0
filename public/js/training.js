var config = {
  apiKey: "AIzaSyAGgBQTSn3zGYe5Gt18VhLBS7l0tsjh-Uo",
  authDomain: "makerspace-6d561.firebaseapp.com",
  databaseURL: "https://makerspace-6d561.firebaseio.com",
  storageBucket: "makerspace-6d561.appspot.com",
  messagingSenderId: "92352190485"
};



firebase.initializeApp(config);
var users;
var $email = $('#email-input');
var $firstName = $('#firstName-input');
var $lastName = $('#lastName-input');
var dates= [];
var $date = $('#date-input').pickadate();
var $time = $('#time-input').pickatime();


$('#training-submit').click(function(){


  datePicked = $('#date-input').val();
  date = moment(datePicked).format();
  dateUTC = moment(datePicked).format();
  console.log(datePicked);
  console.log($email.val());
  localStorage.setItem("email", $email.val());
  localStorage.setItem("firstName", $firstName.val());
  localStorage.setItem("lastName", $lastName.val());
  localStorage.setItem("date", dateUTC);


  window.location = "/training/" + dateUTC;
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;

    //userPerm = firebase.database().ref('users/' + userId);




  } else {
    console.log("No user is logged in");

  }
});


$(".final_submit").click(function(event){
  if(localStorage.getItem("date")){
    //TODO: Check "uids" for collisions
      var userUID = guid();
      console.log(event.target.id);

      firebase.database().ref('training/' + userUID).set({
        email: localStorage.getItem("email"),
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        date: moment(event.target.data_time).format(),
        uid: userUID,
        coach_uid: event.target.id
    }).then(function(){
      firebase.database().ref("users/" + event.target.id + "/trainings/" + userUID).push({
           training_uid: userUID,
           date: localStorage.getItem("date")
    });
      window.location="/";
      newUser=false;
    });
  }
});


function guid() {
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function s4() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}
