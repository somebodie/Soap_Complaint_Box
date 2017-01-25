var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')

router.get('/', function(req, res) {
  User.find({})
  .exec(function(err, users){
    if (err) { console.log(err); }
    res.render('users/index.hbs', { users: users })
// TODO: Current shows all users on index but will want his to change to a different page
  });
})

router.get('/:id', function(req, res) {
  User.findById(req.params.id)
  .exec(function(err, user) {
    if (err) console.log(err);
    console.log(user);
    res.render('users/show.hbs', { user } );
// TODO: when /:id is request the id takes them to there show page
  });
})


router.get('/signup', function(req, res){
  res.render('users/signup.hbs');
});

router.post('/', authHelpers.createSecure, function(req, res){
  var user = new User({
    email: req.body.email,
    password_digest: res.hashedPassword
  });

  user.save(function(err, user){
    if (err) console.log(err);

    console.log(user);
    res.redirect('/users'); 
  });

});

module.exports = router;
