function TodoController() {
	var service = new TodoService()

	function getTodos() {
		service.getTodos(draw)
	}

	// TODO: Have max of n todos, or have scrolling when n/size is reached
	function draw(todos) {
		var template = '';

		var uncompleteTodos = todos.filter(todo => !todo.completed);
		$('#todo-counter').html(uncompleteTodos.length + ' to do')

		todos.forEach(todo => {
			template += `
				<li class="todo">
					<div>
						<input ${todo.completed ? 'checked' : ''} type="checkbox" id=${todo._id} name="completed" onchange="app.controllers.todo.toggleTodoStatus('${todo._id}')">
						<label for=${todo._id}>${todo.description}</label>
					</div>
					<div class='glyphicon glyphicon-trash text-right todo-delete-button' onclick="app.controllers.todo.removeTodo('${todo._id}')"></div>
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
		service.removeTodo(todoId, getTodos);
	}

	function listenForTodoButtonClick() {
		$('#todo-button').click(e => {
			$('#todo-button').unbind('click');
			$('#todo-list').show();
			listenForClickOutside();
		})
	}

	// Closes the todolist when clicking anywhere outside of it.
	function listenForClickOutside() {
		$(document).mouseup(function (e) {
			var todoList = $("#todo-list");
			// if the target of the click isn't the container nor a descendant of the container
			if (!todoList.is(e.target) && todoList.has(e.target).length === 0) {
				todoList.hide();
				$(document).unbind('mouseup');
				setTimeout (listenForTodoButtonClick, 1);
			}
		});
	}

	listenForTodoButtonClick();

	getTodos();
}
