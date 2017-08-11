function TodoService() {
	var todoList = []

	function logError(err) {
		console.error('UMM SOMETHING BROKE: ', err)
	}

	this.getTodos = function (draw) {
		$.get('/api/todos')
			.then((todos) => {
				todoList = todos
				draw(todoList)
			})
			.fail(logError)
	}

	this.addTodo = function (todo, getTodos) {
		$.post('/api/todos', todo)
			.then(getTodos)
			.fail(logError)
	}

	this.toggleTodoStatus = function (todoId, getTodos) {
		var todo = todoList.find(todo => todo._id == todoId);
		todo.completed = !todo.completed;

		$.ajax({
			method: 'PUT',
			contentType: 'application/json',
			url: '/api/todos/' + todoId,
			data: JSON.stringify(todo)
		})
			.then((message) => {
				getTodos()
			})
			.fail(logError)
	}

	this.removeTodo = function (todoId, getTodos) {
		var todo = todoList.find(todo => todo._id == todoId);

		$.ajax({
			method: 'DELETE',
			contentType: 'application/json',
			url: '/api/todos/' + todoId,
			data: JSON.stringify(todo)
		})
			.then((message) => {
				getTodos()
			})
			.fail(logError)
	}
}
