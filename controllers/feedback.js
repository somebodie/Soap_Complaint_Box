var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js')
var mongoose = require('mongoose');
var Feedback = require('../models/feedback.js');

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


        var currentUser = req.session.currentUser._id;

        User.find(currentUser, function(err, currentUser) {
            currentUser.feedback.push(feedback);
        });

        user.save(function(err, user) {
            if (err) console.log(err);

            console.log(user);
            res.render('feedback/allfeedback.hbs');
        });
    });
});

//Feedback Show Route testing:588ae8ee6b73cd3daabbdbee
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

// Feedback Edit Route
router.get('/:id/edit', function(req, res) {
  var item = Feedback.findById(req.params.id).exec()

  item.then(function(feedback) {
    res.render('feedback/edit', user)
  })
  .catch(function(err) {
    console.log(err)
  })
})

// Feedback UPDATE ROUTE
router.patch('/:id', function(req, res){
// FIXME: after determine create determine how to fix
});

// Feedback DESTROY
router.delete('/:id', function(req, res) {
    currentUser.feedback.splice(req.params.id, 1); //remove the item from the array

    res.redirect('/');
});


module.exports = router;
