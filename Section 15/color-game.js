

var squares = document.querySelectorAll('.square');
var rgbDisplay = document.getElementById('goalColor');
var message = document.getElementById('message');
var h1 = document.querySelector('h1');
var btnNewColors = document.getElementById('newColors');
var modeButtons = document.querySelectorAll('.mode');

var numColors;
var colors;
var goalColor;

init();

function init() {
	numColors = 6;
	newGame();

	setupSquares();

	setupModeButtons();

	btnNewColors.addEventListener('click', function() {
		newGame();
	});

}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = colors[i];

		squares[i].addEventListener('click', function(){
			if(this.style.backgroundColor === goalColor) {
				correctColor();
			} else {
				this.style.backgroundColor = '#232323';
				message.textContent = 'Try Again';
			}
		});
	}	
}

function setupModeButtons() {
	//mode events
	for(var i = 0; i < modeButtons.length; i++) {
		modeButtons[i].addEventListener('click', function() {
			modeButtons[0].classList.remove('selected');
			modeButtons[1].classList.remove('selected');
			this.classList.add('selected');
			if(this.textContent === 'Easy') {
				numColors = 3;
			} else {
				numColors = 6;
			}
			newGame();
		});
	}
}

function newGame() {
	//generate all new colors
	colors = generateColors(numColors);
	//pick a new color
	goalColor = pickColor(numColors);
	//change color display
	rgbDisplay.textContent = goalColor;
	//change colors of squares

	for(var i = 0; i < squares.length; i++) {
		if(colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].classList.remove('hidden');
		} else {
			squares[i].classList.add('hidden');
		}
	}

	message.textContent = '';
	btnNewColors.textContent = 'New Colors';
	h1.style.backgroundColor = 'steelblue';
}

function correctColor() {
	for(var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = goalColor;
	}
	h1.style.backgroundColor = goalColor;
	message.textContent = 'Correct!';
	btnNewColors.textContent = 'Play Again?';
}

function pickColor(num) {
	var rndNum = Math.floor(Math.random() * num);

	return colors[rndNum];
}

function generateColors(num) {
	var arr = [];

	for(var i = 0; i < num; i++) {
		var color = 'rgb(' + randomColor() + ', ' + randomColor() + ', ' + randomColor() + ')';
		arr.push(color);
	}

	return arr;
}

function randomColor() {
	return Math.floor(Math.random() * 256);
}


