var button = document.querySelector("button");
var body = document.querySelector('body');

var changed = false;
button.addEventListener('click', function() {
	// if(changed) {
	// 	body.style.background = 'white';
	// } else {
	// 	body.style.background = 'purple';
	// }
	// changed = !changed;

	document.body.classList.toggle('purple');
});