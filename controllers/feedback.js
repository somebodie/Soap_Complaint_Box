var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')
var mongoose = require('mongoose');
var Feedback = require('../models/feedback.js');
var async = require("async");

// TODO: http://localhost:4000/feedback
router.get('/', function(req, res) {
    Feedback.find({}).exec(function(err, feedback) {
        if (err) {
            console.log(err);
        }
        res.render('feedback/allfeedback.hbs', {
            feedback: feedback
        });
    });
});

// Feedback post TODO: http://localhost:4000/feedback/newpost NEW
router.get('/newpost', authHelpers.authorized, function(req, res) {
    res.render('feedback/newpost.hbs');
});
//this route will do 2 things at once:
//1 .Create and save Feedback to feedback collection
//2. Find the user this feedback belongs to and push it in that users' feedback array
//why would we also do option 1? this will save time to access Feedback without the user
// why would we do option 2? So that we can access feedback via the user

router.post('/', function(req, res) {
  //Find the logged in User
  console.log("POST ROUTE ACCESSED YAAAAAY");

  User.findById(req.session.currentUser._id).exec(function(err, user) {
    var newFeedback = new Feedback({
         subject: req.body.subject,
         detail: req.body.detail,
         // type: req.params.type,
     });
    newFeedback.save(function(err, feedback) {
      console.log("FEEDBACK SAVED YAY", feedback);
      user.feedback.push(feedback);
      user.save();
      console.log("USER SAVED?", user);
      res.redirect('feedback/' + feedback._id);
    })
  });
});

//Feedback Show Route
router.get('/:id', function (req, res) {
  Feedback.findById(req.params.id)
      .exec(function(err, feedback) {
          if (err) console.log(err);
          console.log(feedback);
          res.render('feedback/show.hbs', {
              feedback
          });
          // TODO: when /:id is request the id takes them to there show page
      });
});

// Feedback Edit Route testing:588ae8ee6b73cd3daabbdbee || 588b6a3163eee705ae0d2a6b
router.get('/:id/edit', function(req, res) {
  Feedback.findById(req.params.id)
      .exec(function(err, feedback) {
          if (err) console.log(err);
          console.log(feedback);
  res.render('feedback/edit.hbs', {
        feedback
});
});
});

// Feedback UPDATE ROUTE
router.patch('/:id', authHelpers.authorized, function(req, res){
  Feedback.findByIdAndUpdate(req.params.id, {
      subject: req.body.subject,
      detail: req.body.detail,
      type: req.body.type,
      id: req.params.id
    }    , {new: true})
  .exec(function(err, feedback) {
    if (err) { console.log(err) }
        res.render('feedback/show.hbs', { //does not show with the change
          feedback
        });
  });

});

// Feedback DESTROY
router.delete('/id', authHelpers.authorized, function(req, res){
Feedback.findbyidanddelete(req.params.id)
.exec(function (err, feedback) {
   delete feedback;
    res.redirect('/feedback')
});
});
module.exports = router;
