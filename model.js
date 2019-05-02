const mongoose = require('mongoose');
const uuid = require('uuid');
mongoose.Promise = global.Promise;

let postSchema = mongoose.Schema({
	id: {type: Number, required: true, unique: true},
	title: {type: String, required: true},
	content: {type: String, required: true},
	author: {type: String, required: true},
	publishDate: {type: Date, required: true}
});

let Posts = mongoose.model('Posts', postSchema);

const ListPosts = {
	get : function(){
		return Posts.find()
			.then(posts => {
				return posts;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	post : function(newPost){
		return Posts.create(newPost)
			.then(post => {
				return post;
			})
			.catch(err => {
				 throw new Error(err);
			});
	},
	getById : function(postId){
		return Posts.findOne({id : postId})
			.then(post => {
				if (post){
					return post;
				}
				throw new Err("Post not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	put : function(postId, newData){
		return Posts.findOneAndUpdate({id : postId}, { $set: newData }, { new: true })
			.then(post => {
				if (post){
					return post;
				}
				throw new Err("Post not found");
			})
			.catch(err =>{
				throw new Error(err);
			});
	},
	delete : function(postId){
		return Sports.findOneAndRemove({id : postId})
			.then(post => {
				if (post){
					return post;
				}
				throw new Err("Post not found");
			})
			.catch(err => {
				throw new Error(err);
			})
	}
}

/*let post1 = {
	id: uuid.v4(),
	title: 'Lab1',
	content: 'balblabal',
	author: 'Rodrigo',
	publishDate: new Date(2019, 3, 31)
};

let post2 = {
	id: uuid.v4(),
	title: 'Lab2',
	content: 'balblabal',
	author: 'Rodrigo',
	publishDate: new Date(2019, 3, 31)
};

let posts = [post1, post2];

const ListPosts = {
	get : function(){
		return posts;
	}
}*/

module.exports = {ListPosts};