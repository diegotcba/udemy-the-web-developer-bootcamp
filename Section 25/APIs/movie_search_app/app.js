var express = require('express');
var app = express();
var request = require('request');

app.set('view engine', 'ejs');

app.get('/search', function(req, res) {
	res.render('search');
});


app.get('/results', function(req, res) {
	var query = req.query.search;
	
	searchMovieByTitle(query, function(list) {
		//res.send(list.Search[0].Title);
		res.render('results', { query: query, results: list.Search });
	});

});

app.get('*', function(req, res) {
	res.send('Movie App!!');
});

function searchMovieByTitle(title, cb) {
	var endpoint = 'http://www.omdbapi.com/?s=' + title + '&apiKey=thewdb';

	request(endpoint, function(error, response, body) {
		if(!error && response.statusCode === 200) {
			results = JSON.parse(body);
			cb(JSON.parse(body));
		}
	});
}

app.listen(3000, function() {
	console.log('Movie App has started!!');
});
