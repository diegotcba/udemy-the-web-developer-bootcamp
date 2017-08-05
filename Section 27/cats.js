var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/cat_app');

var catSchema = new mongoose.Schema({
	name: String,
	age: Number,
	temperament: String
});

var Cat = mongoose.model('Cat', catSchema);

//add a new cat
// var george = new Cat({
// 	name: 'Mrs. Norris',
// 	age: 7,
// 	temperament: 'Evil'
// });

// george.save(function(error, cat) {
// 	if(error) {
// 		console.log('ERROR');
// 		console.log(error);
// 	} else {
// 		console.log('CAT SAVED');
// 		console.log(cat);
// 	}
// });

Cat.create({
	name: 'Snow White',
	age: 15,
	temperament: 'Bland'
}, function(err, cat) {
	if(err) {
		console.log('ERROR');
		console.log(error);
	} else {
		console.log('CAT SAVED');
		console.log(cat);
	}
});

//retrieves all cats
Cat.find(function(err, cats) {
	if(err) {
		console.log('Error');
		console.log(err);
	} else {
		console.log('===== CATS ======');
		console.log(cats);
	}
});