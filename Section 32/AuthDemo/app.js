var express = require('express'),
    app = express(),
	mongoose = require('mongoose'),
	passport = require('passport'),
	bodyParser = require('body-parser'),
	LocalStrategy = require('passport-local'),
	passportLocalMongoose = require('passport-local-mongoose'),
	User = require('./models/user.js');


mongoose.connect('mongodb://localhost/auth_demo_app');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(require('express-session')({
	secret: "Rusty is the best and cutest dog in the worlds",
	resave: false,
	saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//ROUTES

app.get('/', function(req, res) {
	res.render('home');
});

app.get('/secret', isLoggedIn, function(req, res) {
	res.render('secret');
});

//Auth Routes
app.get('/register', function(req, res) {
	res.render('register');
});

//handling sign up
app.post('/register', function(req, res) {

	User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
		if(err) {
			res.redirect('/register');
		} else {
			passport.authenticate('local')(req, res, function() {
				res.redirect('/secret');
			});
		}
	});
});

//LOGIN ROUTES
app.get('/login', function(req, res) {
	res.render('login');
});

//login logic
//middleware
app.post('/login', passport.authenticate('local', {
	successRedirect: '/secret',
	failureRedirect: '/login'
}), function(req, res) {
});

//LOGOUT
app.get('/logout', function(req, res) {
	req.logout();
	res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
}

app.listen(3000, function() {
	console.log('Auth Demo is running');
});
