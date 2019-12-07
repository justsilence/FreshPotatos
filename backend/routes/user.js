const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');
const Review = require('../models/review');
var passport = require('passport');

require('../config/passport')(passport);

router.post('/signup', (req, res, next) => {
    passport.authenticate('signup', (err, user, msg) => {
        if (err) {
            console.log(err);
        }
        if (msg) {
            console.log(msg);
            res.json(msg.message);
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
                })
            })
        }
    })(req, res, next);
});


router.post('/login', (req, res, next) => {
    passport.authenticate('login', (err, user, info) => {
        if (err) {
            console.log(err);
        }
        if (info) {
            console.log(info.message);
            res.send(info.message);
        } else {
            req.logIn(user, err => {
                User.findOne({
                    email: req.body.email
                }).then(user => {
                    const token = jwt.sign(
                        { 
                            userId: user._id,
                            email: user.email
                        }, 
                        process.env.SECRET_KEY,
                        { expiresIn: "1h" }
                    );
                    res.status(200).send({
                        auth: true,
                        user_id: user._id,
                        email: user.email,
                        name: user.name,
                        token: 'JWT ' + token,
                        message: 'user found & logged in',
                    });
                });
            });
        }
    })(req, res, next);
})

router.get('/profile', passport.authenticate('jwt'), (req, res, next) => {
    const user_id = req.body._id;
    Review.find({user_id: user_id}).then(reviews => {
        res.json({
            message: "access profile success!",
            reviews: reviews
        });
    });
});

router.get('/auth/github',
  passport.authenticate('github', { scope: [ 'user:email' ] }));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    // Successful authentication, redirect home.
    res.status(200).json({
        message: "Github OAuth success!"
    });
  });

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/auth/google/callback', 
  passport.authenticate('google'),
  (req, res) => {
      res.json({
          message: "success"
      })
  });

router.get('/success', (req, res, next) => {
    res.json({
        message: "success"
    });
});


// router.get('/auth/twitter', passport.authenticate('twitter.login'));

// router.get('/auth/twitter/callback', passport.authenticate)

// app.get('/auth/twitter/callback', 
//   passport.authenticate('twitter', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

// app.get('/auth/twitter',
//   passport.authenticate('twitter'));

// router.post('/signup', (req, res, next) => {
//     bcrypt.hash(req.body.password, 10).then(hashedPassword => {
//         const email = req.body.email;
//         const name = email.split('@')[0];
//         const user = new User({
//             name: name,
//             email: req.body.email,
//             password: hashedPassword,
//             isAdmin: false
//         });
//         user.save().then(result => {
//             res.status(201).json({
//                 message: "User created successfully!",
//                 result: result
//             });
//         }).cache(err => {
//             res.status(500).json({
//                 message: err
//             });
//         });
//     });
// });

// router.post('/login', (req, res, next) => {
//     let fetchedUser;
//     User.findOne({email: req.body.email}).then(user => {
//         if (!user) {
//             return res.status(401).json({
//                 message: "User does not exist!"
//             });
//         }
//         fetchedUser = user;
//         return bcrypt.compare(req.body.password, user.password);
//     }).then(result => {
//         if (!result) {
//             return res.status(401).json({
//                 message: "Password does not match! Try again"
//             });
//         }
//         const token = jwt.sign(
//             { userId: fetchedUser._id, email: fetchedUser.email },
//             "a_string_need_to_be_replace_in_production_period", 
//             { expiresIn: "1h" }
//         );
//         res.status(200).json({
//             token: token
//         });
//     }).catch(err => {
//         return res.status(401).json({
//             message: err
//         });
//     });
// });

// router.get('/profile', (req, res, next) => {
    
// });

module.exports = router;