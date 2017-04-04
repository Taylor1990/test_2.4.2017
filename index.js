var express = require('express'),
    app = express();

app.use(express.static(__dirname));

app.use('scripts/backbone.js',function(req, res){
  res.sendFile(__dirname +'/scripts/backbone.js');
})

app.use('scripts/jquery.js', function(req, res){
  res.sendFile(__dirname + '/scripts/jquery.js');
})

app.use('scripts/lodash.js',function(req, res){
  res.sendFile(__dirname + '/scripts/lodash.js');
})

app.use('scripts/main.js', function(req, res){
  res.sendFile(__dirname + '/scripts/main.js');
})
app.use(function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

module.exports = app;
