var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var expressSanitizer = require('express-sanitizer');

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
//needs to be below body-parser
app.use(expressSanitizer());
app.use(methodOverride('_method'));

mongoose.connect('mongodb://localhost/restful_blog_app');

//title
//image
//body
//created
var blogSchema = new mongoose.Schema({
	title: String,
	image: String,
	body: String,
	created: {type: Date, default: Date.now }
});

var Blog = mongoose.model('Blog', blogSchema);

// Blog.create({
// 	title: 'Test Blog',
// 	image: 'https://images.unsplash.com/photo-1469225208447-8329cbd3cb3a?dpr=1&auto=compress,format&fit=crop&w=376&h=252&q=80&cs=tinysrgb&crop=',
// 	body: 'HELLO THIS IS A BLOG POST!!'
// });


app.get('/', function(req, res) {
	res.redirect('/blogs');
});

//INDEX
app.get('/blogs', function(req, res) {
	//Get all blogs from db
	Blog.find({}, function(err, allBlogs) {
		if(err) {
			console.log(err);
		} else {
			res.render('index', { blogs: allBlogs});
		}
	});
});

//NEW
app.get('/blogs/new', function(req, res) {
	res.render('new');
});

//CREATE
app.post('/blogs', function(req, res) {
	//Get data from form
	req.body.blog.body = req.sanitize(req.body.blog.body);
	var blog = req.body.blog;
	//Save blog on db
	Blog.create(blog, function(err, createdBlog){
		if(err) {
			console.log('ERROR');
			res.redirect('/blogs/new');
		} else {
			//Redirect to index
			res.redirect('/blogs');
		}
	});
});

//SHOW
app.get('/blogs/:id', function(req, res) {
	//Get the blog from the db
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err) {
			console.log(err);
			res.redirect('/blogs');
		} else {
			//Render the blog
			res.render('show', { blog: foundBlog});
		}
	});
});

//EDIT
app.get('/blogs/:id/edit', function(req, res) {
	//Get blog data from db
	Blog.findById(req.params.id, function(err, foundBlog) {
		if(err) {
			res.redirect('/blogs');
		} else {
			res.render('edit', { blog: foundBlog})
		}
	});

	//render template with datas
});

//UPDATE
app.put('/blogs/:id', function(req, res) {
	req.body.blog.body = req.sanitize(req.body.blog.body);
	Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog) {
		if(err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs/' + req.params.id);
		}
	});
});

//DELETE
app.delete('/blogs/:id', function(req, res) {
	Blog.findByIdAndRemove(req.params.id, function(err) {
		if(err) {
			res.redirect('/blogs');
		} else {
			res.redirect('/blogs');
		}
	});
});

app.listen(3000, function() {
	console.log('Restful BlogApp is running!!');
});
