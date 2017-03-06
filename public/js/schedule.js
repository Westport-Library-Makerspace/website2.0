
var userId;
var submit;
var type;
var $date = $('#date-input').pickadate();
var $time = $('#time-input').pickatime();


$('#coach-submit').click(function(){
  var date = $date.val();
  var time = $time.val();
  var day = date + " " + time ;

  day = moment(day, ['DDMMMMY HH:mm a']);
  console.log(day.format('dd'));
  firebase.database().ref('users/' + userId + '/schedule_times/' + day.format('ddd')).set({
    training_uid: '00000000-0000-0000-0000-000000000000',
    start_time: day.format(),
    end_time: day.add(2, 'hour').format()

}).then(function(){
  window.location = "/";
});

});


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    userId = firebase.auth().currentUser.uid;

    //userPerm = firebase.database().ref('users/' + userId);
    firebase.database().ref('/users/' + userId).once('value').then(function(snapshot) {

      if(snapshot.val().type == "coach"){
      console.log("User found!");
    }
    else{
      window.location = "/";
    }
    });
    console.log(type);
    //TODO Make this server side


  } else {
    console.log("No user is logged in");

  }
});
