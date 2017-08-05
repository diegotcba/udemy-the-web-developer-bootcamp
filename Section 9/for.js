
console.log("ALL NUMBERS BETWEEN -10 AND 19");

for(var i=-10; i < 20; i++) {
	console.log(i);
}



console.log("EVEN NUMBERS BETWEEN 10 AND 40");

for(var i = 10; i <= 40; i+=2) {
	console.log(i);
}

console.log("ALL ODD NUMBERS BETWEEN 300 AND 333");
for(var i = 301; i <= 333; i++) {
	if(i % 2 !== 0) {
		console.log(i);
	}
}


console.log("ALL NUMBER DIVISIBLE BY 5 AND 3, BETWEEN 5 AND 50");

for(var i = 5; i <= 50; i++) {
	if ((i % 5 === 0) && (i % 3 === 0)) {
		console.log(i);
	}
}