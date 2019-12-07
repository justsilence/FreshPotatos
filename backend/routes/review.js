const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const passport = require('passport');
const User = require('../models/user');
require('../config/passport')(passport);


router.get('/', (req, res, next) => {
    Review.find({movie_id: req.body.movie_id}).then(results => {
        res.status(200).json({
            message: "Fetched movie info successful!",
            movie: results
        });
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

router.put('/:id', (req, res, next) => {
    const review = new Review({
        _id: req.body._id,
        title: req.body.title,
        content: req.body.content,
        user_id: req.body.user_id,
        movie_id: req.body.movie_id
    });
    Review.updateOne({_id: req.params.id}, review).then(result => {
        res.status(200).json({
            message: "Update review successful!"
        });
    });
});


router.delete('/:id', (req, res, next) => {
    Review.deleteOne({_id: req.params.id}).then(result => {
        res.status(200).json({
            message: "delete review successful!"
        });
    });
});

module.exports = router;