module.exports = {
	getTodos: function(next) {
		Todo.find().exec(function(err, todos) {
			if (err) throw err;
			next(todos);
		});
	},
	addTodo: function(todoVal, next) {
		Todo.create({value: todoVal}).exec(function(err, todos) {
			if (err) throw err;
			next(todos);
		});
	},
	removeTodo: function(todoVal, next) {
		Todo.destroy({value: todoVal}).exec(function(err, todos) {
			if (err) throw err;
			next(todos);
		});
	}
}