var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')
var mongoose = require('mongoose');
var Feedback = require('../models/feedback.js');
// var currentUser = req.session.currentUser._id;


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

// Feedback post TODO: http://localhost:4000/feedback/newpost
router.get('/newpost', authHelpers.authorized, function(req, res) {
    res.render('feedback/newpost.hbs');
});

router.post('/', function(req, res) {

    //this route will do 2 things at once:
    //1 .Create and save Feedback to feedback collection
    //2. Find the user this feedback belongs to and push it in that users' feedback array
    //why would we also do option 1? this will save time to access Feedback without the user
    // why would we do option 2? So that we can access feedback via the user

    var newFeedback = new Feedback({
        subject: req.body.subject,
        detail: req.body.detail,
        // resolve: false,
        type: req.params.type,
        // views:
    });

    newFeedback.save(function(err, feedback) {
        if (err) console.log(err);

        console.log(feedback);



        User.find(currentUser, function(err, currentUser) {
            currentUser.feedback.push(feedback);
            // FIXME: push is not working or showin on user


        user.save(function(err, user) {
            if (err) console.log(err);

            console.log(user);
          res.redirect('feedback/' + feedback._id);
            });
        });
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
  var item = Feedback.findById(req.params.id).exec();

  item.then(function(feedback) {
    res.render('feedback/edit', feedback);
  })
  .catch(function(err) {
    console.log(err);
  });
});

// Feedback UPDATE ROUTE
router.patch('/:id', function(req, res){
  var editFeedback = Feedback.findByIdAndUpdate(req.params.id);

  editFeedback.subject = req.body.subject,
  editFeedback.detail = req.body.detail,
  editFeedback.type = req.params.type,
   { new: true }
  .exec(function(err, feedback){
    if (err) { console.log(err); }
    console.log(feedback);
    res.redirect('/:id/show')
  });});

// Feedback DESTROY
router.delete('/:id', function(req, res) {
    currentUser.feedback.splice(req.params.id, 1); //remove the item from the array

    res.redirect('/');
});


module.exports = router;
