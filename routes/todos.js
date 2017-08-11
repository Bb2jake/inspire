var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
	completed: { type: Boolean, default: false },
	description: { type: String, required: true },
})

var Todos = mongoose.model('Todo', schema);

router.get('/', (req, res, next) => {
	Todos.find({})
		.then(todos => {
			res.send(todos)
		})
		.catch(next);
})

router.post('/', (req, res, next) => {
	Todos.create(req.body)
		.then(todo => {
			res.send(todo);
		})
		.catch(next);
})

router.put('/:todoId', (req, res, next) => {
	Todos.findByIdAndUpdate(req.params.todoId, req.body)
		.then(todo => {
			res.send(todo);
		})
		.catch(next);
})

router.delete('/:todoId', (req, res, next) => {
	Todos.findByIdAndRemove(req.params.todoId)
		.then(todo => {
			res.send({ message: "Todo successfully deleted" });
		})
		.catch(next);
})

router.use(DefaultErrorHandler);

function DefaultErrorHandler(err, req, res, next) {
	res.json({ success: false, error: err.message });
}

module.exports = router;