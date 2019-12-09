const express = require('express');
const router = express.Router();
const passport = require('passport');

const Movie = require('../models/movie');
const Review = require('../models/review');
const User = require('../models/user')

require('../config/passport')(passport);


// GET /api/movie/search?name=sdasd

router.get('/top', (req, res, next) => {
    let n = req.query.n;
    var topn = 3;
    if (n) {
        topn = parseInt(n);
        if (topn > 250) {
            topn = 10;
        }
    }
    Movie.find({}).sort({'rating': 'desc'}).limit(topn).then(result => {
        res.status(200).json({
            movies: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.get('/new', (req, res, next) => {
    Movie.find({}).sort({'datePublished': 'desc'}).limit(10).then(result => {
        res.status(200).json({
            movies: result
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});


router.get('/search', (req, res, next) => {
    const genre = req.query.genre;
    console.log(genre);
    const name = req.query.name;
    console.log(name);
    const result = {}

    if (genre) {
        Movie.find({genre: { $regex : new RegExp(genre, "i") }}).then(movies => {
            res.status(200).json({
                message: "success",
                result: movies
            });
        });
    } else if (name) {
        Movie.find({name: { $regex : new RegExp(name, "i") }}).then(movies => {
            res.status(200).json({
                message: "success",
                result: movies
            });
        });
    }
})

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    Movie.findById(id).then(movie => {
        Review.find({movie_id: id}).then(review => {
            res.status(200).json({
                movie: movie,
                review: review
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// 5dec666d5d65c80639e9e8d9
router.post('/:id', passport.authenticate('jwt'), (req, res, next) => {
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
        movie_id: req.params.id
    });
    review.save().then(createdReview => {
        res.status(201).json({
            message: "Add a new review successfully!",
            review_id: createdReview._id
        });
    });
});

router.put('/:id', passport.authenticate('jwt'), (req, res, next) => {
    const new_review = {
        title: req.body.title,
        content: req.body.content,
    };

    Review.findOne({_id: req.params.id}).then(review => {
        review.updateOne({user_id: req.user.user_id}, new_review, {new: true}).then(result => {
            res.status(200).json({
                message: "Update review successful!",
                result: result
            });
        }).catch(err => {
            res.status(500).json({
                error: err,
                message: "User does not match!"
            });
        });
    }).catch(err => {
        res.status(500).json({
            error: err,
            message: "No review"
        });
    });

    // Review.findByIdAndUpdate(req.params.id, review, {new: true}).then(result => {
    //     res.status(200).json({
    //         message: "Update review successful!",
    //         result: result,
    //     });
    // }).catch(err => {
    //     console.log(err);
    //     res.status(500).json(err);
    // })
});

router.delete('/:id', passport.authenticate('jwt'), (req, res, next) => {
    if (req.user.isAdmin) {
        Review.deleteOne({_id: req.params.id}).then(result => {
            res.status(200).json({
                message: "delete review successful!",
                result: result
            }).catch(err => {
                console.log(err);
                res.status(500).json(err);
            });
        });
    } else {
        Review.deleteOne({_id: req.params.id, user_id: req.user.user_id}).then(result => {
            res.status(200).json({
                message: "delete review successful!",
                result: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
});




module.exports = router;