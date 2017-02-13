var users;
var $email = $('#email-input');
var $firstName = $('#firstName-input');
var $lastName = $('#lastName-input');
var dates= [];
var $date = $('#date-input').pickadate();
var $time = $('#time-input').pickatime({
  interval: 15

});



$('#training-submit').click(function(){
  datePicked = $('#date-input').value;
  console.log(datePicked);
});

firebase.auth().onAuthStateChanged(function(user) {


  if (user) {
    userId = firebase.auth().currentUser.uid;

    //userPerm = firebase.database().ref('users/' + userId);




  } else {
    console.log("No user is logged in");

  }
});
