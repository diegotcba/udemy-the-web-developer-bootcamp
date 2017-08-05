var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var Campground = require('./models/campground.js');
var Comment = require('./models/comment.js');
var User = require('./models/user.js');
var seeDB = require('./seeds.js');
var methodOverride = require('method-override');
var flash = require('connect-flash');

//requiring routes
var commentRoutes = require('./routes/comments.js');
var campgroundRoutes = require('./routes/campgrounds.js');
var	indexRoutes = require('./routes/authentication.js');

mongoose.connect('mongodb://localhost/yelp_camp');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(flash());//must be before passport config
//seeDB();

//PASSPORT CONFIG
app.use(require('express-session')({
	secret: "Once again Rusty is the cutest dog",
	resave: true,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next) {
	res.locals.currentUser = req.user;
	res.locals.error = req.flash('error');
	res.locals.success = req.flash('success');
	next(); //must be
});

app.use(indexRoutes);
app.use('/campgrounds/:id/comments', commentRoutes);
app.use('/campgrounds', campgroundRoutes);

app.listen(3000, function() {
	console.log('YelpCamp is running');
});