// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');


var obj = new ObjectID();
console.log(obj);

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) =>{
	if (err){
		return console.log('Unable to connect to MongoDB server');
	} 

	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp')

	// db.collection('Todos').find().count().then((count) =>{
	// 	console.log(`Todos count: ${count}`);
	// 	// console.log(JSON.stringify(docs,undefined,2))
	// }, (err) => {
	// 	console.log('Unable to fetch todos', err);
	// });

	db.collection('Users').find(
		{$or: [{name:"Steve Tregear"},{name:"Matthew Tregear"},{name:"Paul Tregear"}]}).count().then((count) =>{
		console.log(`User count: ${count}`);
		// console.log(JSON.stringify(docs,undefined,2))
	}, (err) => {
		console.log('Unable to fetch todos', err);
	});

	client.close();

	});