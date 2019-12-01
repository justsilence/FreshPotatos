const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then(hashedPassword => {
        const user = new User({
            email: req.body.email,
            password: hashedPassword
        });
        user.save().then(result => {
            res.status(201).json({
                message: "User created successfully!",
                result: result
            });
        }).cache(err => {
            res.status(500).json({
                message: err
            });
        });
    });
});

router.post('/login', (req, res, next) => {
    User.findOne({email: req.body.email}).then(user => {
        if (!user) {
            return res.status(401).json({
                message: "User does not exist!"
            });
        }
        return bcrypt.compare(req.body.password, user.password);
    }).then(result => {
        if (!result) {
            return res.status(401).json({
                message: "Password does not match! Try again"
            });
        }
        const token = jwt.sign(
            { email: user.email, userId: user._id },
            "a_string_need_to_be_replace_in_production_period", 
            { expiresIn: "1h" }
        );
    }).catch(err => {
        return res.status(401).json({
            message: err
        });
    });
});

module.exports = router;