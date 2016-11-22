var express = require('express'),
partials = require('express-partials');
var app = express();

app.use(partials());
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', function (req, res) {
  res.render('landing');
});

app.get('/login', function (req, res) {
  res.render('login', {layout: false});
});


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
