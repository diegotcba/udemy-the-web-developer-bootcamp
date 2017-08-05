var p = document.querySelector('p span');
var p1Score = document.querySelector('#p1Score');
var p2Score = document.querySelector('#p2Score');
var txtLimit = document.getElementById('limit');
var btnPlayer1 = document.getElementById('player1');
var btnPlayer2 = document.getElementById('player2');
var btnReset = document.getElementById('reset');

var limit = 5;
var scorePlayer1 = 0;
var scorePlayer2 = 0;
var gameFinished = false;

var strLimit = 'Playing to: ';

txtLimit.value = limit;
p.textContent = limit;
showScore();

txtLimit.addEventListener('change', function() {
	limit = Number(txtLimit.value);
	p.textContent = limit;
});

btnReset.addEventListener('click', function() {
	scorePlayer1 = 0;
	scorePlayer2 = 0;
	gameFinished = false
	p1Score.classList.remove('winScore');
	p2Score.classList.remove('winScore');
	showScore();
});

btnPlayer1.addEventListener('click', function() {
	if(!gameFinished) {
		scorePlayer1++;
		showScore();
	}
});

btnPlayer2.addEventListener('click', function() {
	if(!gameFinished) {
		scorePlayer2++;
		showScore();
	}
});

function showScore() {
	gameFinished = (scorePlayer1 === limit || scorePlayer2 === limit);
	p1Score.textContent = scorePlayer1;
	p2Score.textContent = scorePlayer2;
	if(scorePlayer1 === limit) {
		p1Score.classList.add('winScore');
	} else if(scorePlayer2 === limit) {
		p2Score.classList.add('winScore');
	} 
	// else {
	// 	p1Score.classList.toggle('');
	// 	p2Score.classList.toggle('');
	// }
}

