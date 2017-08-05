var express = require('express');

var router = express.Router({ mergeParams: true});
var Campground = require('../models/campground.js');
var Comment = require('../models/comment.js');
var middleware = require('../middleware/index.js');
//NEW - Comment
router.get('/new', middleware.isLoggedIn, function(req, res) {
	Campground.findById(req.params.id, function(err, foundCamp) {
		if(!err) {
			res.render('comments/new', {campground: foundCamp});
		}
	});
});

//CREATE - comment
router.post('/', middleware.isLoggedIn, function(req, res) {
	//get the comment from form

	//save the comment for the campground
		Campground.findById(req.params.id, function(err, foundCamp) {
		if(!err) {
			//get the campground from the db
			Comment.create(req.body.comment, function(err, newComment) {
				if(!err) {
					//add username and id
					newComment.author.id = req.user._id;
					newComment.author.username = req.user.username; 
					//save comment
					newComment.save();
					//add the comment to the campground
					foundCamp.comments.push(newComment);
					foundCamp.save(function(err, updatedCamp) {
						if(!err) {
							req.flash('success', 'Successfully created comment')
							res.redirect('/campgrounds/' + updatedCamp._id);
						}
					});
				}
			});
		} else {
			req.flash('error', 'Database issue');
			res.redirect('/campgrounds');
		}
	});
});

//EDIT
router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res) {
	Comment.findById(req.params.comment_id, function(err, foundComment) {
		if(err) {
			console.log(err);
		} else {
			res.render('comments/edit', {comment: foundComment, campgroundId: req.params.id});
		}
	});
});


//UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment) {
		if(err) {
			console.log(err);
		} else {
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
})

//DELETE
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res) {
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if(err) {
			console.log(err);
		} else {
			req.flash('success', 'Comment deleted');
			res.redirect('/campgrounds/' + req.params.id);
		}
	});
});



module.exports = router;