var todos = [];

var input = '';


while(input !== 'quit') {
	if(input === 'list') {
		showTodoList();
	} else if(input === 'new') {
		addTodo();
	} else if(input === 'delete') {
		removeTodo();
	}

	input = prompt('What would you like to do?');
}

console.log('YOU QUIT THE APP!!');

function showTodoList() {
	console.log('**************');

	// for(var i = 0; i < todos.length; i++) {
	// 	console.log(i + ': ' + todos[i]);
	// }

	todos.forEach(function(todo, index){
		console.log(index + ': ' + todo);
	});

	console.log('**************');
}

function addTodo() {
	var newTodo = prompt('Enter new todo');

	todos.push(newTodo);
	console.log('\"' + newTodo  + '\" added to list');	
}

function removeTodo(){
	var index = prompt('Index to remove');

	console.log('\"' + todos[index] + '\" removed from list');
	todos.splice(index, 1);
	//todos.pop(index);
}