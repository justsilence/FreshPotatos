var express = require('express');
var router = express.Router();
const Movie = require('../models/movie');

var process = (genres) => {
    var ret = [];
    for (i in genres) {
        if (genres[i].length > 1) {
            ret.push(genres[i]);
        }
    }
    return ret;
}

//
router.get('/', (req, res, next) => {
    Movie.distinct('genre').then(genres => {
        Movie.find({}).then(movies => {
            res.status(200).json({
                genres: process(genres),
                movies: movies
            });
        });
    });
});


module.exports = router;