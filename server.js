const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const postRouter = require('./router');
const app = express();
const jsonParser = bodyParser.json();
mongoose.Promise = global.Promise;

const {DATABASE_URL, PORT} = require('./config');

app.use(express.static('public'));
app.use('/posts/api', jsonParser, postRouter);

let server;

function runServer(port, databaseUrl){
	return new Promise( (resolve, reject) => {
		mongoose.connect(databaseUrl,
				err => {
					if (err){
						return reject(err);
					}
					else{
						server = app.listen(port, () =>{
							console.log('Your app is running in port ', port);
							resolve();
						})
						.on('error', err => {
							mongoose.disconnect();
							return reject(err);
						});
					}
				}
			);
	});
}

function closeServer(){
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing the server');
				server.close( err => {
					if (err){
						return reject(err);
					}
					else{
						resolve();
					}
				});
			});
		});
}

runServer(PORT, DATABASE_URL )
	.catch(err => console.log(err));

module.exports = { app, runServer, closeServer };
