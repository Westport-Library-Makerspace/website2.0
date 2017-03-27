$(document).ready(function(){

var database = firebase.database();
var userRef = database.ref('/users');

userRef.on('value', function(snapshot){
  $(".tbody").empty();

  //TODO Add unique "Client IDS" so you are not passing out their firebase id
  snapshot.forEach(function(child){
    $(".tbody").append("<tr><td><a href=\"/users/" + child.val().uid +" \">"+ child.val().firstName +" " + child.val().lastName +"</a></td><td> "+ child.val().email  + " </td><td>" + child.val().type + "</td>");

  });
});


});
