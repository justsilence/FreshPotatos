# Backend

## Models

### Movie
```
	{
	   name: {type: String, maxlength: 128, required:true},
       image: {type: String}, 
       genre: [String],
       actor: [String],
	   director: [String],
	   description: {type: String},
	   datePublished: {type: String},
	   rating: {type: Number},
	   duration: {type: String},
	   trailer: {type: String}
	 }
```
### Review
```
{
	title: {type: String},
    content: {type: String},
    user_id: {type: Schema.Types.ObjectId, ref: 'user'},
    movie_id: {type: Schema.Types.ObjectId, ref: 'movie'}
}
```

### User
```
	{
		name: {type: String, maxlength: 128},
	    email: {type: String, required: true, unique: true},
	    password: {type: String, required: true, minlength: 5, maxlength: 64},
	    isAdmin: Boolean,
	    github: {type: {id: String, token: String}},
	    google: {type: {id: String, token: String}}
    }
```
