var movies = [];

movies.push({
	title: "Matrix",
	rating: 5,
	hasWatched: true
});

movies.push({
	title: "Smurfs",
	rating: 1,
	hasWatched: false
});

movies.push({
	title: "Heat",
	rating: 5,
	hasWatched: true
});

movies.push({
	title: "Ghost in the Shell",
	rating: 3.5,
	hasWatched: true
});

movies.forEach(function(elem) {
	var output = 'You have ';
	if(elem.hasWatched) {
		output += 'watched ';
	} else {
		output += 'not seen ';
	}

	output += '\"' + elem.title + '\" - ' + elem.rating + ' stars';

	console.log(output);
});