var express = require('express');
var router = express.Router();
var Campground = require('../models/campground.js');
var middleware = require('../middleware/index.js');

//INDEX
router.get('/', function(req, res) {
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
router.post('/', middleware.isLoggedIn, function(req, res) {
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var camp = {
		name: req.body.name,
		image: req.body.image,
		description: req.body.description,
		price: req.body.price,
		author: author
	};

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
router.get('/new', middleware.isLoggedIn, function(req, res) {
	res.render('campgrounds/new');
});

//SHOW
router.get('/:id', function(req, res) {
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

//EDIT
router.get('/:id/edit', middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCamp) {
		res.render('campgrounds/edit', {campground: foundCamp});
	});
});

//UPDATE
router.put('/:id', middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCamp) {
		if(err) {
			res.redirect('/campgrounds');
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});

//DELETE
router.delete('/:id', middleware.checkCampgroundOwnership, function(req, res) {
	Campground.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect('/campgrounds');
		} else {
			req.flash('success', 'Campground deleted');
			res.redirect('/campgrounds');
		}
	});
})


module.exports = router;