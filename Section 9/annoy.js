var question = "Are we there yet?"
var answer = "";

//while(answer !== "yes" && answer !== "yeah") {
while(answer.indexOf("yes") === -1 && answer.indexOf("yeah") === -1) {
	answer = prompt(question);
}

alert("YAY, WE MADE IT");

