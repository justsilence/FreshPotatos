const express = require('express');
const router = express.Router();
const passport = require('passport');

const Movie = require('../models/movie');
const Review = require('../models/review');
const User = require('../models/user')

require('../config/passport')(passport);

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

router.post('/', passport.authenticate('jwt'), (req, res, next) => {
    const review = new Review({
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
        movie_id: req.body.movie_id
    });
    review.save().then(createdReview => {
        res.status(201).json({
            message: "Add a new review successfully!",
            review_id: createdReview._id
        });
    });
});

router.put('/:id', passport.authenticate('jwt'), (req, res, next) => {
    const review = {
        title: req.body.title,
        content: req.body.content,
    };
    
    Review.findByIdAndUpdate(req.params.id, review, {new: true}).then(result => {
        res.status(200).json({
            message: "Update review successful!",
            result: result,
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});


router.delete('/:id', passport.authenticate('jwt'), (req, res, next) => {
    Review.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({
            message: "delete review successful!"
        });
    });
});


module.exports = router;