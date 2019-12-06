# Fresh Potatos

## Backend

### Notes

**Please set environment first**

Create a `.env` file in `backend` folder, put your 

* `USERNAME=<REPLACE>`
* `PASSWORD=<REPLACE>`
* `HOST=<REPALCE>`
* `DATABASE=<REPLACE>`

### How to use?

1. make sure you enter the correct folder. (Run `cd backend`)
2. Run `npm install` to install all the packages needed for the server.
3. Run `npm start` to start the server


## API Usage

Use `GET /api/user/signup` to create a new user
example:

```JS
{
    "name": "test 1",
    "email": "test1@test.com",
    "password": 12345678,
    "isAdmin": false
}
```

Use `GET api/user/login` to login

```JS
{
    "email": "test1@test.com",
    "password": 12345678
}
```

Use `GET api/user/profile` to access user's profile


Use `GET api/index` to acess the data needed for home page
This will return all the information about all the movies as a JSON array.

example (2 movies as a JSON array):

```JS
[
    {
        "genre": [
            "Action",
            "Sci-Fi"
        ],
        "actor": [
            "Arnold Schwarzenegger",
            "Linda Hamilton",
            "Edward Furlong",
            "Robert Patrick"
        ],
        "director": [
            "James Cameron"
        ],
        "_id": "5de437b36abb92686a089749",
        "name": "Terminator 2: Judgment Day",
        "image": "https://m.media-amazon.com/images/M/MV5BMGU2NzRmZjUtOGUxYS00ZjdjLWEwZWItY2NlM2JhNjkxNTFmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        "description": "Terminator 2: Judgment Day is a movie starring Arnold Schwarzenegger, Linda Hamilton, and Edward Furlong. A cyborg, identical to the one who failed to kill Sarah Connor, must now protect her teenage son, John Connor, from a more...",
        "datePublished": "1991-07-03",
        "rating": 8.5,
        "review": {
            "userName": "SeminolePhenom",
            "title": "Words cannot describe the greatness of this movie",
            "content": "A Terminator(Arnold Schwarzenegger) was sent from the future to kill the unborn son of Sarah Connor(Linda Hamilton) in the original. Now, that Terminator has been sent back again but with a different assignment: Protect John Connor. John Connor(Edward Furlong) is now about 10 years of age and must evade a new Terminator sent to kill him;The T-1000(Robert Patrick). Sarah, John, and The Terminator journey together on their quest to stop Judgement Day, with a trailing, shape-shifting Termiantor trailing from behind.\n\nThis is the greatest of the Terminator trilogy. I have watched three times in the past year and have not found anything that Cameron could have improved on. The move is a masterpiece in every aspect of film. Schwarzenegger's acting might not be incredible but this is the perfect role for him. He isn't supposed to show emotion or feelings. He is a machine. I hate almost every one of his movies besides this trilogy because he is a horrible actor but he works perfectly into this role.\n\nThe special effects are incredible beyond belief. The shape-shifting T-1000 is some of the greatest animation I have witnessed in cinema history. It absolutely blew my mind when I first experienced this visual extravaganza. The animation looked so real(remembering this was a good ten years). The movie included fast-paced action along with some clever sci-fi drama/horror. The idea of a vast army of machines taking over the world after sending off warheads to every major city should be scary enough. But the T-1000 has very little lines and is just creepy enough to make twitch when you see him.\n\nSci-fi movies can rarely be made in such way that can be looked at as works of art. This is one of the few exceptions. The prediction of judgment day with Hamilton watching a playground full of kids be burnt to the ground is an absolute brilliant portrayal of Armageddon. The theme that men will destroy themselves is also shown throughout the movie also and is even said by The Terminator\" It's in your nature to destroy yourselves\". This brings the movie to a whole new level of sci-fi.\n\nOverall, Termiantor II: Judgement Day is an absolute must see classic. If you have not seen it, buy it! Because once you have seen it, you will want to do so anyways. It is fast paced and highly enjoyable for just about every audience.\n\nI highly recommend this movie.",
            "rating": "10"
        },
        "duration": "PT2H17M",
        "contentRating": "R"
    },
    {
        "genre": [
            "Adventure",
            "Drama",
            "Musical",
            "Sport"
        ],
        "actor": [
            "Aamir Khan",
            "Raghuvir Yadav",
            "Gracy Singh",
            "Rachel Shelley"
        ],
        "director": [
            "Ashutosh Gowariker"
        ],
        "_id": "5de437b46abb92686a08974a",
        "name": "Lagaan: Once Upon a Time in India",
        "image": "https://m.media-amazon.com/images/M/MV5BNDYxNWUzZmYtOGQxMC00MTdkLTkxOTctYzkyOGIwNWQxZjhmXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg",
        "description": "Lagaan: Once Upon a Time in India is a movie starring Aamir Khan, Raghuvir Yadav, and Gracy Singh. The people of a small village in Victorian India stake their future on a game of cricket against their ruthless British rulers.",
        "datePublished": "2001-06-15",
        "rating": 8.1,
        "review": {
            "userName": "gabriellasofia",
            "title": "Lagaan Once Upon A Time In India",
            "content": "This  movie not only opened my eyes to the beatuies of india but also the hearts of India. I fell in love with this movie at once and I feel very close to all of the characters I know them and feel for them. The dancing and singing made my heart pound and my heart overwhelmed by the matchless beauty and I was imagining myself following along with Gauri. I love this story and I could watch it daily and never tire of the beauty it holds. I have always loved indian people and the culture which they live, I am American and have never visited India,soon I will visit in person and dreams of going there will no longer tug at me . I hope to one day perform the dances as well as those in the movie.   I really loved that in the movie the characters were faced with such hardship but somehow they were of cheer and sang together and lifted one anothers spirits.I love this movie some may tire of its length but I wish it would continue forever. I want to be a part of it."
        },
        "duration": "PT3H44M",
        "contentRating": "PG"
    }
]

```

Use `GET api/movie/{id}` to access the specific movie.
`{id}` is movie id which automatic generated by MongoDB. All those information is send to FrontEnd when use `GET /api/index`.

Use `GET api/review` to get all the review related to a movie, if the user is logged in, then they can modify the review created by themselves, otherwise, they can only read those reviews.

Use `POST api/review` to create a new review of a movie.

Use `PUT api/review` to modify the review