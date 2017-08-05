var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Campground = require('./models/campground.js');
var Comment = require('./models/comment.js');
var seeDB = require('./seeds.js');

mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
seeDB();


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
			res.render('campgrounds/index', { campgrounds: allCampgrounds});
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
	res.render('campgrounds/new');
});

//SHOW
app.get('/campgrounds/:id', function(req, res) {
	//find campground with id
	Campground.findById(req.params.id).populate('comments').exec(function(err, foundCamp) {
		if(err) {
			console.log(err);
		} else {
			//render template with campgrounds
			res.render('campgrounds/show', { campground: foundCamp});
		}
	});
});



//NEW - Comment
app.get('/campgrounds/:id/comments/new', function(req, res) {
	Campground.findById(req.params.id, function(err, foundCamp) {
		if(!err) {
			res.render('comments/new', {campground: foundCamp});
		}
	});
});

//CREATE - comment
app.post('/campgrounds/:id/comments', function(req, res) {
	//get the comment from form

	//save the comment for the campground
		Campground.findById(req.params.id, function(err, foundCamp) {
		if(!err) {
			//get the campground from the db
			Comment.create(req.body.comment, function(err, newComment) {
				if(!err) {
					//add the comment to the campground
					foundCamp.comments.push(newComment);
					foundCamp.save(function(err, updatedCamp) {
						if(!err) {
							res.redirect('/campgrounds/' + updatedCamp._id);
						}
					});
				}
			});
		} else {
			res.redirect('/campgrounds');
		}
	});
});

app.get('*', function(req, res){
	res.send('Page not found');
});

app.listen(3000, function() {
	console.log('YelpCamp is running');
});