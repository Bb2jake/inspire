function TodoController() {
	// You will need four methods
	// getTodos should request your api/todos and give an array of todos to your callback fn
	// addTodo takes in a todo and posts it to the server
	// toggleTodoStatus takes in a todo marks its status as completed and puts it to the server
	// removeTodo takes in a todoId and sends a delete request to the server
	// **** HINT: Everytime you make a change to any todo don't forget to get the todo list again
	var service = new TodoService()

	function getTodos() {
		service.getTodos(draw)
	}

	// TODO: Show max of n todos, and have scrolling.
	function draw(todos) {
		var template = '';

		var uncompleteTodos = todos.filter(todo => !todo.completed);
		$('#todo-counter').html(uncompleteTodos.length + ' to do')

		todos.forEach(todo => {
			template += `
				<li>
					<input ${todo.completed ? 'checked' : ''} type="checkbox" id=${todo._id} name="completed" onchange="app.controllers.todo.toggleTodoStatus('${todo._id}')">
					<label for=${todo._id}>${todo.description}</label>
				</li>
			`
		})

		$('#todos').html(template);
	}

	this.addTodo = function (e) {
		e.preventDefault()

		var todo = {
			description: e.target.description.value
		}

		service.addTodo(todo, getTodos)
		e.target.reset();
	}

	this.toggleTodoStatus = function (todoId) {
		service.toggleTodoStatus(todoId, getTodos)
	}

	this.removeTodo = function (todoId) {

	}

	this.toggleListDisplay = function () {
		$('#todo-list').toggle();
	}

	getTodos();
}
