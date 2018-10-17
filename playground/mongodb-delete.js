// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client) =>{
	if (err){
		return console.log('Unable to connect to MongoDB server');
	} 

	console.log('Connected to MongoDB server');
	const db = client.db('TodoApp')

	
	db.collection('User').deleteMany({text: "Matthew Tregear"}).then((result) =>{
		console.log(result);
	});

	//deleteOne
	// db.collection('Todos').deleteOne({text: 'Eat lunch'}).then((result) =>{
	// 	console.log(result);
	// });

	//findOneandDelete
	db.collection('User').findOneAndDelete({_id: new ObjectID(123)}).then((result) =>{
		console.log(result);
	});

	client.close();

	});