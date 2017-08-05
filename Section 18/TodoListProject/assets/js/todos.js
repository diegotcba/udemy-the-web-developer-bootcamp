var ul = $('ul');
var items = $('li');
var spansDelete = $('li span');
var input = $('#newTodo');
 
init();

function init() {

	itemDone();
	deleteTodo();
	newTodo();
}

function itemDone() {
	ul.on('click', 'li', function(event) {
		$(this).toggleClass('done');
		event.stopPropagation();
	});
}

function deleteTodo() {
	ul.on('click', 'span', function(event) {

		$(this).parent().fadeOut(500, function() {
			$(this).remove();
		});
		event.stopPropagation();
	});
}

function newTodo() {
	input.val('');
	input.on('keypress', function(event) {
		if(event.which === 13 && $(this).val().length > 0) {
			items.parent().append('<li><span><i class=\"fa fa-trash\"></i></span> ' + $(this).val() + '</li>');
			$(this).val('');
		}
	});

	$('.fa-plus').click(function(){
		input.fadeToggle('slow/400/fast');	
	});
}