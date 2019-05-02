const express = require('express');
const router = express.Router();
const {ListPosts} = require('./model');


router.get('/list-posts', (req, res, next) => {

	ListPosts.get()
	.then( posts => {
		res.status(200).json({
			message : 'Successfully sending the list of posts',
			status : 200,
			posts : posts
		});
	}).catch( err => {
		res.status(500).json({
			message : `Internal server error.`,
			status : 500
		});
		return next();

	});
});


router.post('/post-post', (req, res, next) => {
	
	let requiredFields = ['id', 'title', 'content', 'author', 'publishedDate'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			return next();
		}
	}

	let objectToAdd = {
		id: req.body.id,
		title: req.body.title, 
		content : req.body.content, 
		author: req.body.author, 
		publishedDate: req.body.publishedDate

	};

	console.log(objectToAdd);
	ListPosts.post(objectToAdd)
		.then(post => {
			res.status(201).json({
				message : "Successfully added the post",
				status : 201,
				post : post
			});
		})
		.catch( err => {
			res.status(400).json({
				message : `${err}`,
				status : 400
			});
			return next();
		});
});

router.get('/list-posts/:id', (req, res) => {
	let postId = req.params.id;

	ListPosts.getById(postId)
		.then(post => {
			res.status(200).json({
				message : "Successfully sent the post",
				status : 200,
				post : post
			});
		})
		.catch(err => {
			res.status(404).json({
				message : "post not found in the list",
				status : 404
			});
		});
});

router.put('/update-post/:id', (req, res) => {
	let requiredFields = ['title'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});
			next();
		}
	}

	let postId = req.params.id;

	if (postId){	
		let updatedFields = { title : req.body.title };

		ListPosts.put(postId, updatedFields)
			.then(post => {
				res.status(200).json({
					message : "Successfully updated the post",
					status : 200,
					post : post
				});
			})
			.catch(err => {
				res.status(404).json({
					message : "post not found in the list",
					status : 404
				});

				next();
			});	
	}
	else{
		res.status(406).json({
			message : "Missing param 'id'",
			status : 406
		});

		next();
	}
});

router.delete('/remove-post/:id', (req, res) => {
	let requiredFields = ['id'];

	for ( let i = 0; i < requiredFields.length; i ++){
		let currentField = requiredFields[i];

		if (! (currentField in req.body)){
			res.status(406).json({
				message : `Missing field ${currentField} in body.`,
				status : 406
			});

			next();
		}
	}
	let postId = req.params.id;

	if (postId){
		if(postId == req.body.id){

			ListPosts.delete(postId)
				.then(post => {
					res.status(204).json({
						message : "Successfully deleted the post",
						status : 204,
						post : post
					});
				})
				.catch(err => {
					res.status(404).json({
						message : "post not found in the list",
						status : 404
					}).send("Finish");
				})
	
		}
		else{
			res.status(400).json({
				message : "Param and body do not match",
				status : 400
			});

			next();
		}
	}
	else{
		res.status(406).json({
			message : "Missing param 'id'",
			status : 406
		});

		next();
	}
});

module.exports = router;