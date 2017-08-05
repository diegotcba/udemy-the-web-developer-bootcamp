var express = require('express');
var app = express();


app.get('/', function(req, res) {
	res.send('Hi there, welcome to my assignment!');
});

app.get('/speak/:animal', function(req, res) {
	res.send(speakAnimal(req.params.animal.toLowerCase()));
});


app.get('/repeat/:message/:num', function(req, res) {
	var message = req.params.message;
	var num = Number(req.params.num);

	res.send(repeatMessage(message, num));
});

app.get('*', function(req, res) {
	res.send('Sorry, page not found...What are you doing with your life');
});

app.listen(3000, function() {
	console.log('Server has started');
});

function speakAnimal(animal) {
	var message = {pig: 'Oink', cow: 'Moo', dog: 'Woof Woof'}

	var result = 'The ' + animal + ' says ';

	result += '\'' + message[animal] + '\'';

	return result;
}

function repeatMessage(str, num) {
	var message = '';

	for(var i = 0; i < num; i++) {
		message += ' ' + str;
	}

	return message;
}