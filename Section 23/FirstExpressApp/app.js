var express = require('express');
var app = express();

app.get('/', function(req, res) {
	res.send('Hi there!!');
});

app.get('/bye', function(req, res) {
	res.send('Goodbye!!');
});

app.get('/dog', function(req, res) {
	res.send('MEOW!!');
});

app.get('/r/:subredditName', function(req, res) {
	console.log(req.params);
	res.send('You\'re in a sub reddit - ' + req.params.subredditName);
});

app.get('*', function(rew, res) {
	res.send('YOU ARE A STAR');
});

app.listen(3000, function() {
	console.log('Server has started!!');
});
