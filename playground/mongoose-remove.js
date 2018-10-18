	const {ObjectID} = require('mongodb');

	const {mongoose} = require('./../server/db/mongoose');
	const {Todo} = require('./../server/models/todo');
	const {User} = require('./../server/models/user')

	// Todo.remove({}).then((result) => {
	// 	console.log(result);
	// })

	 Todo.findOneAndRemove('5bc8758617728a16c7f832c2').then((todo) =>{
	 	console.log(todo);
	 });
	// Todo.findByIdAndRemove

	// Todo.findbyIdandRemove('asdf').then((todo) =>{

	// });