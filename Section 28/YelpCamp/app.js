var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

//SCHEMA SETUP
var campgroundSchema = new mongoose.Schema({
	name: String,
	image: String,
	description: String
});

var Campground = mongoose.model('Campground', campgroundSchema);

// Campground.create({
// 	name: 'Grantice Hill', 
// 	image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg',
// 	description: 'This is a huge granite hill, no bathrooms. No water. Beatiful granite!'
// }, function(err, campground) {
// 	if(err) {
// 		console.log(err);
// 	} else {
// 		console.log('New Campground created')
// 	}
// });

// var campgrounds = [
// 		{name: 'Salmon Creek', image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'},
// 		{name: 'Grantice Hill', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
// 		{name: 'Mountain Top', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
// 		{name: 'Salmon Creek', image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'},
// 		{name: 'Grantice Hill', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
// 		{name: 'Mountain Top', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'},
// 		{name: 'Salmon Creek', image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg'},
// 		{name: 'Grantice Hill', image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg'},
// 		{name: 'Mountain Top', image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg'}
// 	];


app.get('/', function(req, res) {
	res.render('landing');
});

//INDEX
app.get('/campgrounds', function(req, res) {
	//get from db
	Campground.find({}, function(err, allCampgrounds) {
		if(err) {
			console.log(err);
		} else {
			res.render('index', { campgrounds: allCampgrounds});
		}
	});

});

//CREATE
app.post('/campgrounds', function(req, res) {
	var camp = { name: req.body.name, image: req.body.image, description: req.body.description};

	Campground.create(camp, function(err, createdCamp) {
		if(err) {
			console.log(err);
		} else {

			res.redirect('/campgrounds');
		}
	});

	//campgrounds.push(camp);
});

//NEW
app.get('/campgrounds/new', function(req, res) {
	res.render('new');
});

//SHOW
app.get('/campgrounds/:id', function(req, res) {
	//find campground with id
	Campground.findById(req.params.id, function(err, foundCamp) {
		if(err) {
			console.log(err);
		} else {

			res.render('show', { campground: foundCamp});
		}
	});
	

	//render template with campground
});

app.get('*', function(req, res){
	res.send('Page not found');
});

app.listen(3000, function() {
	console.log('YelpCamp is running');
});