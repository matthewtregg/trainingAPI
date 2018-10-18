	const {ObjectID} = require('mongodb')
	const {mongoose} = require('./../server/db/mongoose')
	const {User} = require('./../server/models/user')

	var id = "5bc7526297e95a191cf9bd5";

	// if (!ObjectID.isValid(id)){
	// 	console.log('ID not valid');
	// }

	// Todo.find({
	// 	_id:id
	// }).then((todos) => {
	// 	console.log('Todos', todos);
	// });

	// Todo.findOne({
	// 	_id:id
	// }).then((todo) => {
	// 	console.log('Todo', todo);
	// });

	// Todo.findById(id).then((todo) => {
	// 	if(!todo){
	// 		return console.log('Id not found');
	// 	}
	// 	console.log('Todo by Id', todo);
	// }).catch((e) => console.log(e));
	
	User.findById(id).then((user) => {
	 	if(!user){
	 		return console.log('unable to find user');
		}
		console.log(JSON.stringify(user,undefined,2));
	}).catch((e) => console.log(e));
	
		
	
		