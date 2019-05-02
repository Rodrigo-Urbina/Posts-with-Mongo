function displayPostList(data){

	$('.posts-list').html("");

	for (let i = 0; i < data.posts.length; i ++){
		$('.posts-list').append(`<li>
									${data.posts[i].title}
								  </li>`);
	}

}

function onload(){
	let url = './posts/api/list-posts';
	let settings = {
		method : 'GET',
		headers : {
			'Content-Type' : 'application/json'
		}
	};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			throw new Error(response.statusText);
		})
		.then(responseJSON => {
			displayPostList(responseJSON);
		})
		.catch(err => {
			console.log(err);
		});
}

function updatePostList(data){
	$('.posts-list').append(`<li>
								${data.sport.title}
							  </li>`);
}

function addNewPost(title, id){

	let data = {
		title : title,
		id : id
	};

	let url = './posts/api/post-post';
	let settings = {
						method : 'POST',
						headers : {
							'Content-Type' : 'application/json'
						},
						body : JSON.stringify(data)
					};

	fetch(url, settings)
		.then(response => {
			if (response.ok){
				return response.json();
			}
			else{
				return new Promise(function(resolve, reject){
					resolve(response.json());
				})
				.then(data =>{
					throw new Error(data.message);
				})
			}
		})
		.then(responseJSON => {
			updatePostList(responseJSON);
		})
		.catch(err => {
			console.log(err);
		});
}

function watchForm(){
	$('.sportForm').on('submit', function(event) {
		event.preventDefault();
		let title = $('.postTitle').val();
		let id = $('.postId').val();
		addNewPost(title, id);
	});
}

function init(){
	$(onload);
	$(watchForm);
}

$(init);