var express = require('express');
var bodyParser = require('body-parser');

const {ObjectID} = require('mongodb')
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

app.get('/todos', (req,res)=>{

	Todo.find().then((todos) =>{
		res.send({todos})
	}, (e) => {
		res.status(400).send(e);
	})

})

app.get('/todos/:id', (req,res)=>{
	var id = req.params.id;

	if (!ObjectID.isValid(id)){
	 	res.status(404).send('');
	 }


	// Valid id using isValid
		//404 - send back empty send

	Todo.findById(id).then((todo) => {
	 	if(!todo){
	 	res.status(404).send('')
		} else {
       	res.send({todo});
		}
		}, (e) => {	
		
		res.status(400).send(e);
		
	})
	
});	
		
	

// 	// findByID
// 		//success
// 			// if todo send it bacl
// 			// if  no todo send it bacl
// 		// error
// 			// 400 - send empty body back




app.listen(3000, () => {
	console.log('Started on port 3000')
})

module.exports = {app}

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