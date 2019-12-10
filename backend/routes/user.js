const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Review = require('../models/review');
var passport = require('passport');

require('../config/passport')(passport);

router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', (err, user, msg) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                error: err
            });
        }
        if (msg) {
            console.log(msg);
            res.status(500).json({
                message: msg.message
            });
        } else {
            req.logIn(user, err => {
                User.findOne({
                    email: req.body.email
                }).then(user => {
                    user.updateOne({
                        name: req.body.name,
                        email: req.body.email,
                        isAdmin: req.body.isAdmin
                    }).then(() => {
                        console.log('User route: Signup success');
                        res.status(200).json({
                            message: "User created",
                            user: user
                        });
                    })
                }).catch(err => {
                    res.status(500).json({
                        error: err
                    });
                });
            });
        }
    })(req, res, next);
});


router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                error: err
            });
        }
        if (info) {
            console.log(info.message);
            return res.status(400).json({
                auth: false,
                error: info.message
            });
        } else {
            req.logIn(user, err => {
                User.findOne({
                    email: req.body.email
                }).then(user => {
                    const token = jwt.sign(
                        { 
                            userId: user._id,
                            email: user.email,
                            isAdmin: user.isAdmin,
                        }, 
                        process.env.SECRET_KEY,
                        { expiresIn: "1h" }
                    );
                    res.status(200).send({
                        auth: true,
                        user_id: user._id,
                        email: user.email,
                        name: user.name,
                        isAdmin: user.isAdmin,
                        token: 'JWT ' + token,
                        message: 'success',
                    });
                });
            });
        }
    })(req, res, next);
});


router.get('/profile', passport.authenticate('jwt'), (req, res, next) => {
    User.findOne({_id: req.user._id}).then(user => {
        Review.find({user_id: req.user._id}).then(reviews => {
            res.json({
                message: "access profile success!",
                profile: user,
                reviews: reviews
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Access profile failed",
                error: err
            });
        });
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            message: "Access profile failed",
            error: err
        });
    })
});

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    const token = jwt.sign(
        {
            userId: req.user._id,
            email: req.user.email,
            isAdmin: req.user.isAdmin,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
    );
    res.status(200).json({
        auth: true,
        user_id: req.user._id,
        email: req.user.email,
        isAdmin: req.user.isAdmin,
        name: req.user.name,
        token: 'JWT ' + token,
        message: 'google oauth success',
    });
});

module.exports = router;