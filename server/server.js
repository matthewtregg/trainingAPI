var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());


app.post('/todos', (req, res) => {
	var todo = new Todo({
		text: req.body.text
	});

	todo.save().then((doc) => {
		res.send(doc);
	}, (e) => {
		res.status(400).send(e);
	});

})



app.listen(3000, () => {
	console.log('Started on port 3000')
})


//GET/todos/1232233
// var newTodo = new Todo({
// 	text: 'Cook dinner'
// })

// newTodo.save().then((doc) => {
// 	console.log('Saved todo',doc)
// }, (e) => {
// 	console.log('Unable to save todo')
// });

// var otherTodo = new Todo({text:'Edit this video'})


// otherTodo.save().then((doc)=>{
// 	console.log(JSON.stringify(doc, undefined,2));
// }, (e) => {
// 	console.log('Unable to save', e);
// });

// User

// var newUser = new User({
// 	email: 'tregearmatthew@gmail.com'
//  })

// newUser.save().then((doc)=>{
// 	console.log(JSON.stringify(doc, undefined,2));
//  }, (e) => {
// 	console.log('Unable to save', e);
// });

// save new something
