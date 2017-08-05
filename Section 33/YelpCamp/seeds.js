var mongoose = require('mongoose');
var Comment = require('./models/comment.js');
var Campground = require('./models/campground.js');

var data = [
		{
			name: 'Salmon Creek', 
			image: 'https://farm4.staticflickr.com/3872/14435096036_39db8f04bc.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			name: 'Grantice Hill',
			image: 'https://farm8.staticflickr.com/7205/7121863467_eb0aa64193.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
		{
			name: 'Mountain Top',
			image: 'https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg',
			description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat nonproident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
		},
	];

function seeDB() {
	//Remove all
	Campground.remove({}, function(err) {
		if(!err) {
			console.log('removed campgrounds!!');
			//add a few camps
			data.forEach(function(seed){
				Campground.create(seed, function(err, camp) {
					if(!err) {
						console.log('added a campground');
						//add a few comments
						Comment.create({
							text: 'This place is great, but I wish there was internet',
							author: 'Homer'
						}, function(err, comm) {
							if(!err) {
								camp.comments.push(comm);
								camp.save();
								console.log('added comment');
							}
						});
					}
				});
			});
		}
	});

}

module.exports = seeDB;

