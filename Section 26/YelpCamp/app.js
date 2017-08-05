var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

var campgrounds = [
		{name: 'Salmon Creek', image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'},
		{name: 'Grantice Hill', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
		{name: 'Mountain Top', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
		{name: 'Salmon Creek', image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'},
		{name: 'Grantice Hill', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
		{name: 'Mountain Top', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
		{name: 'Salmon Creek', image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'},
		{name: 'Grantice Hill', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
		{name: 'Mountain Top', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'}
	];


app.get('/', function(req, res) {
	res.render('landing');
});

app.get('/campgrounds', function(req, res) {
	res.render('campgrounds', { campgrounds: campgrounds});
});

app.post('/campgrounds', function(req, res) {
	var camp = { name: req.body.name, image: req.body.image};

	campgrounds.push(camp);
	res.redirect('/campgrounds');
});

app.get('/campgrounds/new', function(req, res) {
	res.render('new-camp');
});

app.get('*', function(req, res){
	res.send('Page not found');
});

app.listen(3000, function() {
	console.log('YelpCamp is running');
});