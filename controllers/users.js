var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')
var mongoose = require('mongoose');
var Feedback = require('../models/feedback.js');

router.get('/', function(req, res) {
    res.render('users/index.hbs');
});

router.get('/allusers', function(req, res) {
  User.find({})
  .exec(function(err, users){
    if (err) { console.log(err); }
    res.render('users/allusers.hbs', { users: users });
});
});

router.get('/signup', function(req, res){
  res.render('users/signup.hbs');
});

router.post('/', authHelpers.createSecure, function(req, res){
  var user = new User({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password_digest: res.hashedPassword
  });

  user.save(function(err, user){
    if (err) console.log(err);

    console.log(user);
    res.redirect('/users/allusers');
  });
});

router.get('/:id', function(req, res) {
  User.findById(req.params.id)
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log(user);
    res.render('users/show.hbs', { user } );
// TODO: when /:id is request the id takes them to there show page
  });
})

module.exports = router;
