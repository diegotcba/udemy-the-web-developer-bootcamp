
console.log("ALL NUMBERS BETWEEN -10 AND 19");

var num = -10;

while(num < 20) {
	console.log(num);
	num++;
}



console.log("EVEN NUMBERS BETWEEN 10 AND 40");
num = 10;

while(num <= 40) {
	if (num % 2 === 0) {
		console.log(num);
	}

	num++;
}

console.log("ALL NUMBER BETWEEN 300 AND 333");
num = 300;

while(num <= 333) {
	if (num % 2 !== 0) {
		console.log(num);
	}
	num++;
}


console.log("ALL NUMBER DIVISIBLE BY 5 AND 3, BETWEEN 5 AND 50");
num = 5;

while(num <= 50) {
	if ((num % 5 === 0) && (num % 3 === 0)) {
		console.log(num);
	}
	num++;
}