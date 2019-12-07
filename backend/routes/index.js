var express = require('express');
var router = express.Router();
const Movie = require('../models/movie');

//
router.get('/', (req, res) => {
    Movie.find({}).then(movies => {
        res.json(movies);
    });
});

router.post('/', (req, res) => {
    var body = req.body;
    body.success = "post test";
    res.send(body);
});

module.exports = router;