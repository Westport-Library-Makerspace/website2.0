var express = require('express'),
partials = require('express-partials');
var app = express();

app.use(partials());
app.use(express.static('public'))
app.set('view engine', 'ejs');
app.set('views', './views');
app.get('/', function (req, res) {
  res.render('landing', {layout: 'layout_landing'});
});

app.get('/login', function (req, res) {
  res.render('login', {layout: 'layout_landing'});
});

app.get('/admin', function(req,res){
  res.render('admin');
});


app.listen(3000, function () {
  console.log('Server port listening on port 3000!');
});
