


function printReverse(array) {
	for(var i = array.length-1; i >= 0; i--) {
		console.log('//' + array[i]);
	}
}

function isUniform(array) {
	var elem;
	// array.forEach(function(item, index) {
	// 	if(index === 0) {
	// 		elem = item;
	// 	}

	// 	console.log(elem);
	// 	console.log(item);

	// 	if(elem !== item) {
	// 		return false;
	// 	}
	// });

	for(var i = 0; i < array.length; i++) {
		if(i === 0) {
			elem = array[i];
		}
		if(elem !== array[i]) {
			return false;
		}
	}

	return true;
}
function sumArray(array) {
	var sum = 0;

	array.forEach(function(item){
		sum += item;
	});

	return sum;
}

function max(array) {
	var result;

	array.forEach(function(item, index){
		if(index === 0) {
			result = item;
		}
		if(item > result) {
			result = item;
		}
	});

	return result;
}