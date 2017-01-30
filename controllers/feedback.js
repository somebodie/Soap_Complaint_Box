var express = require('express');
var router = express.Router();
var User = require('../models/user.js');
var authHelpers = require('../helpers/auth.js');
var mongoose = require('mongoose');
var Feedback = require('../models/feedback.js');
var async = require("async");


// Feedback index page
router.get('/', function(req, res){
  Feedback.find({}).exec(function(err, feedback) {
    if (err) {console.log(err)}
    res.render('feedback/index.hbs',{
      feedback: feedback
  });
  });
});

// Feedback new post
router.get('/new', function(req, res) {
  res.render('feedback/new.hbs');
});

// Feedback show page
router.get('/:id', function(req, res) {
  Feedback.findById(req.params.id).exec(function(err, feedback) {
        if (err) {console.log(err)}
    res.render('feedback/show.hbs', {
      feedback: feedback
    });
  });
});

// Feedback Create page
router.post('/', function(req, res) {
  console.log("POST ROUTE ACCESSED YAAAAAY");

  Feedback.findById(req.params.id).exec(function(err, feedback) {
    var newFeedback = new Feedback({
         subject: req.body.subject,
         detail: req.body.detail,
         type: req.params.type,
     });
    newFeedback.save(function(err, feedback) {
      console.log("FEEDBACK SAVED YAY", feedback);
      res.redirect('feedback/' + feedback._id);
    });
  });
});


// Feedback EDIT/UPDATE page
// FIXME:
router.get('/:id/edit', function (req, res) {
  Feedback.findById(req.params.id).exec(function(err, feedback) {
    if (err) {
      console.log(err)
    }
    res.render('feedback/edit.hbs', { feedback : {
      subject: feedback.subject,
      detail: feedback.detail,
      type: feedback.type,
      ID: req.params.id
      }
  });
  });
});

router.put('/:id', function (req, res) {
  Feedback.findByIdAndUpdate(req.params.id, req.body,
    {new: true})
  .exec(function(err, feedback) {
    if (err) {
      console.log(err);}
      res.render('feedback/show', { //redirect constanly threw and error
        feedback: feedback,
      });
  });
    });

// delete page
// FIXME: render not going to right place
router.delete('/:id', function(req, res) {
  Feedback.findByIdAndRemove(req.params.id).exec(function(err, feedback) {
    if (err) {console.log(err);}
});
  res.render('feedback/index.hbs');
});


module.exports = router;
