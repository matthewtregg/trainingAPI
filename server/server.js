require('./config/config')

const _ = require ('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb')

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());



app.post('/users', (req, res) => {
	var body = _.pick(req.body,['email', 'password']);
	var user = new User(
		body
	);

	

	user.save().then(() => {
		return user.generateAuthToken();
	}).then((token) =>{
		res.header('x-auth',token).send(user)
	})
	.catch((e) => {
		res.status(400).send(e);
	});

}) 






app.get('/users/me', authenticate,(req,res) => {
	res.send(req.user);

})




app.post('/users/login',(req,res) => {
	
	var body = _.pick(req.body, ['email','password']);

    User.findByCredentials(body.email, body.password).then((user) =>{
		user.generateAuthToken().then((token) => {
			res.header('x-auth',token).send(user)
		});
	}).catch((e) =>{
		res.status(400).send()
	});



})



app.post('/todos', authenticate,(req, res) => {
	

	var todo = new Todo({
		text: req.body.text,
		_creator: req.user._id
	});

	todo.save().then((doc) => {
	res.send(doc)
	}).catch((e) => {
		res.status(400).send(e);
	});

}) 

app.get('/todos', authenticate, (req,res)=>{

	Todo.find({
		_creator: req.user._id
	}).then((todos) =>{
	res.send({todos})
	}).catch((e) => {
		res.status(400).send(e);
	})

})


app.get('/todos/:id', authenticate,(req,res)=>{
	var id = req.params.id;

	if (!ObjectID.isValid(id)){
	 	res.status(404).send('');
	}


	// Valid id using isValid
		//404 - send back empty send

	Todo.findOne({
		_id:id,
		_creator: req.user._id
		}).then((todo) => {
	 	if(!todo){
	 	res.status(404).send('')
		} 
       	
       	res.send({todo})
		}).catch((e) => {	
		
		res.status(400).send(e);
		
	})
	
});	
		
	
app.patch('/todos/:id', authenticate, (req,res) =>{
	var id = req.params.id;
	var body = _.pick(req.body,['text', 'completed']);

	if (!ObjectID.isValid(id)){
		res.status(404).send('');
	}

	if (_.isBoolean(body.completed) && body.completed){
		body.completedAt = new Date().getTime();
	} else {
		body.completed = false;
		body.completedAt = null;
	}

	//findOneAndUpdate
	Todo.findOneAndUpdate({
		_id:id,
		_creator: req.user._id
		}
		, {$set:body}, {new:true}).then ((todo) => {

	if(!todo){
		return res.status(404).send()
	}

	res.send({todo});
	}).catch((e) => {
		res.status(400).send();	
	})


});



app.delete('/todos/:id', authenticate, (req,res) =>{
	var id = req.params.id;

	//validate the id ->not valid? return 404
	if (!ObjectID.isValid(id)){
	 	res.status(404).send();
	}






	Todo.findOneAndRemove({
		_id: id,
		_creator: req.user._id
	}).then((todo) => {
	 	if(!todo){
	 	res.status(404).send()
		} 
       	res.send({todo})
		}).catch((e) => {	
		res.status(400).send(e);
		
	})

	// remove todo by id
		// success
			// if no doc send 404
			// if doc send 404
		// error
			//400 with empty body

});
// 	// findByID
// 		//success
// 			// if todo send it bacl
// 			// if  no todo send it bacl
// 		// error
// 			// 400 - send empty body back

app.delete('/users/me/token',authenticate, (req,res) =>{

	req.user.removeToken(req.token).then(() =>{
		res.status(200).send()
	},() => {
		res.status(400).send()
	})

});











app.listen(port, () => {
	console.log(`Started on port ${port}`)
})

module.exports = {app}

//GET/todos/1232233
// var newTodo = ne Todo({
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