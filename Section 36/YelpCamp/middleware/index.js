var Campground = require('../models/campground.js');
var Comment = require('../models/comment.js');

//all middleware
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Campground.findById(req.params.id, function(err, foundCamp) {
			if(err) {
				req.flash('error', 'Database issue')
				res.redirect('back');
			} else {
				if(foundCamp.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'You don\'t have permission to do that');
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that')
		res.redirect('back');
	}	
};

middlewareObj.checkCommentOwnership = function(req, res, next) {
	if(req.isAuthenticated()) {
		Comment.findById(req.params.comment_id, function(err, foundComment) {
			if(err) {
				res.redirec('back');
			} else {
				//check if user is the author of this comment
				if(foundComment.author.id.equals(req.user._id)) {
					next();
				} else {
					req.flash('error', 'You don\'t have permission to do that');
					res.redirect('back');
				}
			}
		});
	} else {
		req.flash('error', 'You need to be logged in to do that')
		res.redirect("back");
	}
};

middlewareObj.isLoggedIn = function(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	//before redirect
	req.flash('error', 'You need to be logged in');
	res.redirect("/login");
};

module.exports = middlewareObj